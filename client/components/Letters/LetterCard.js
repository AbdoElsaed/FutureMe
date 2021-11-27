import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const opts = { month: "long", day: "numeric", year: "numeric" };

const LetterCard = ({ createdAt, text, deliveryDate, id }) => {
  const theme = useTheme().palette.mode;

  return (
    <Link href={`/letter/${id}`}>
      <a style={{ textDecoration: "none" }}>
        <Card style={{ border: theme === "light" ? "1px solid #CCC" : "" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              A letter from &nbsp;
              {new Date(createdAt).toLocaleDateString("en-EN", opts)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text.substring(0, 350)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              color="text.secondary"
            >
              {format(new Date(createdAt), "MM/dd/yyyy")}→
              {format(new Date(deliveryDate), "MM/dd/yyyy")}
            </Typography>
            {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </a>
    </Link>
  );
};

export default LetterCard;
