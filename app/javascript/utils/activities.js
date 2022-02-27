import { timeSince } from './datetime';

const snakeCase = (string) => string.replace(/\W+/g, ' ')
  .split(/ |\B(?=[A-Z])/)
  .map((word) => word.toLowerCase())
  .join('_');

export default function parseActivity({
  created_at: createdAt,
  params,
  trackable: {
    title,
    commentable_type: commentableType,
    commentable_id: commentableId,
    id,
  },
  owner: {
    username,
    profile_pic: profilePic,
  },
  key,
  id: activityId,
}) {
  switch (key) {
    case 'classroom_resource.complete':
      return {
        text: `@${username} completed the resource ${title} and earned ${params.score} points`,
        link: `/discuss/classroom_resource/${id}/`,
        profilePic,
        time: timeSince(createdAt),
        activityId,
      };
    case 'classroom_resource.create':
      return {
        text: `@${username} created the resource ${title}`,
        link: `/discuss/classroom_resource/${id}/`,
        profilePic,
        time: timeSince(createdAt),
        activityId,
      };
    case 'comment.create':
      return {
        text: `@${username} added a comment - ${title}`,
        link: `/discuss/${snakeCase(commentableType)}/${commentableId}/`,
        profilePic,
        time: timeSince(createdAt),
        activityId,
      };
    default:
      return {};
  }
}
