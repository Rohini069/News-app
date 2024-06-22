import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching article with ID: ${id}`);
        const response = await fetch(`${URL}`);
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch latest articles`);
        }

        const data = await response.json();
        console.log("API response data:", data);

        const foundArticle = data.results.find(
          (item) => item.article_id === id
        );
        console.log("Found article:", foundArticle);

        if (!foundArticle) {
          throw new Error(`Article with ID ${id} not found`);
        }

        setArticle(foundArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to fetch the article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
        <h1>{article.title}</h1>
        <img
          src={article.image_url}
          alt={article.title}
          style={{ width: "100%" }}
        />
        <p>{article.content}</p>
        {article.video_url && (
          <video controls style={{ width: "100%" }}>
            <source src={article.video_url} type="video/mp4" />
          </video>
        )}
      </Container>
    </>
  );
};

export default ArticleDetail;
