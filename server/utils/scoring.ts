export function calculateScore(
  upvotes: number,
  downvotes: number
) {
  return (
    upvotes /
    (upvotes + downvotes + 1)
  ) * 100;
}