import { useState, useEffect } from "react";
import LetterCard from "./LetterCard";
import { Grid, Skeleton } from "@mui/material";

import styles from "../../styles/Letters.module.css";

const Letters = () => {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/message?filter=public");
      const { msgs } = await res.json();
      setLoading(false);
      setMsgs(msgs);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        {loading ? (
          Array.from(new Array(3)).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="text" width={350} />
              <Skeleton variant="rectangular" height={118} />
              <Skeleton variant="text" width={200} />
            </Grid>
          ))
        ) : msgs && msgs.length ? (
          msgs.map((msg, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <LetterCard
                createdAt={msg.createdAt}
                text={msg.msg}
                deliveryDate={msg.date}
                id={msg._id}
              />
            </Grid>
          ))
        ) : (
          <h4> No Public Messages :( </h4>
        )}
      </Grid>
    </div>
  );
};

export default Letters;
