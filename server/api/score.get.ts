import { calculateScore } from "../utils/scoring";

export default defineEventHandler(() => {
  const score = calculateScore(10, 2);

  return {
    upvotes: 10,
    downvotes: 2,
    score
  };
});