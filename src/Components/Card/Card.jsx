import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const defaultImageUrl = "https://via.placeholder.com/300";

const CardComponent = ({
  id,
  title,
  description,
  imageUrl,
  link,
  category,
}) => {
  const truncateText = (text, maxLength) => {
    if (!description) {
      return "";
    }
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
          marginTop: "2rem",
          height: "430px",
          marginBottom: "2rem",
        }}
      >
        {imageUrl ? (
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{ height: "200px", objectFit: "cover" }}
          />
        ) : (
          <Card.Img
            variant="top"
            src={defaultImageUrl}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Card.Title>{truncateText(title, 60)}</Card.Title>
          <Card.Text>{truncateText(description, 80)}</Card.Text>
          <Button
            style={{ marginRight: "5px" }}
            variant="primary"
            href={link}
            target="_blank"
          >
            Read More
          </Button>
          <Link to={`/${id}`}>
            <Button variant="primary">Detailed view</Button>
          </Link>
          <Card.Text className="mt-2">Category: {category}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardComponent;
