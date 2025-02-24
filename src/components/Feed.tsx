import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();
  if (!userId) return;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followingId: userId },
                select: { followingId: true },
              })
            ).map((follow) => follow.followingId),
          ],
        },
      };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include:{user:{select:{displayName:true,username:true,img:true}}},
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <InfiniteFeed />
    </div>
  );
};

export default Feed;
