import { canViewWebsite } from '@/lib/auth';
import { parseRequest } from '@/lib/request';
import { json, unauthorized } from '@/lib/response';
import { getEventDataEvents } from '@/queries/sql/events/getEventDataEvents';
import { z } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ websiteId: string }> },
) {
  const schema = z.object({
    id: z.string(),
  });
  const { auth, query, error } = await parseRequest(request, schema);

  if (error) {
    return error();
  }

  const { websiteId } = await params;
  const { id } = query;

  if (!(await canViewWebsite(auth, websiteId))) {
    return unauthorized();
  }
  const data = await getEventDataEvents(websiteId, {
    eventId: id,
    startDate: new Date(),
    endDate: new Date(),
  });

  return json(data);
}
