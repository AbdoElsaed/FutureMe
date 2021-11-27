import React from "react";
import { useRouter } from "next/router";
import SingleLetter from "../../components/Letters/SingleLetter";

const Letter = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <SingleLetter id={id} />
    </div>
  );
};

export default Letter;
