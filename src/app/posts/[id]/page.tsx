// app/posts/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import styles from "../../../styles/Detail.module.css";
import { Post } from "../../../types/post";
import { useState, useEffect } from "react";
import Image from "next/image";

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );
      const data = await res.json();
      setPost(data.post);
      setIsLoading(false);
    };

    fetcher();
  }, [id]);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (!post) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Image
            height={400}
            width={800}
            src={post.thumbnailUrl}
            alt="記事画像"
          />
          <div className={styles.Tag}>
            <div className={styles.Date}>
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <ul className={styles.Categories}>
              {post.categories.map((category) => {
                return (
                  <li className={styles.Category} key={category}>
                    {category}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className={styles.Title}>{post.title}</p>
          <div
            className={styles.Body}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
