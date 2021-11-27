import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import styles from "../../styles/SingleLetter.module.css";
import { format } from "date-fns";
import { Skeleton } from "@mui/material";

const opts = { month: "long", day: "numeric", year: "numeric" };

const SingleLetter = ({ id }) => {
  const [msg, setMsg] = useState({ msg: "", createdAt: "", date: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/message?filter=single&id=${id}`);
      const { msg } = await res.json();
      setLoading(false);
      setMsg(msg);
    })();
  }, [id]);
  return (
    <div className={styles.container}>
      {loading ? (
        <div>
          <Skeleton variant="text" width={350} />
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" width={200} />
        </div>
      ) : msg ? (
        <div>
          <Typography gutterBottom variant="h4" component="div">
            A letter from &nbsp;
            {new Date(msg.createdAt).toLocaleDateString("en-EN", opts)}
          </Typography>
          <div className={styles.body}>{msg.msg}</div>
          <Typography
            style={{ marginTop: '20px' }}
            gutterBottom
            variant="p"
            component="div"
            color="text.secondary"
          >
            {msg.createdAt && format(new Date(msg.createdAt), "MM/dd/yyyy")}→
            {msg.date && format(new Date(msg.date), "MM/dd/yyyy")}
          </Typography>
        </div>
      ) : (
        <h4> someting is wrong :( </h4>
      )}
    </div>
  );
};

export default SingleLetter;
