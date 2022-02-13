import { Box, Button, makeStyles } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavSearchSuggestedItem from "./NavSearchSuggestedItem";

export default function NavSearchBar() {
  const mui = useStyles();
  const router = useRouter();
  const [stateValue, setStateValue] = useState("");
  const [rows, setRows] = useState([]);

  function handleChange(value) {
    value ? setStateValue(value.trim()) : setStateValue("");
  }

  function handleSearch() {
    if (stateValue) {
      router.push({
        pathname: "/search",
        query: { q: stateValue.trim() },
      });
      setStateValue("");
    }
  }

  useEffect(async () => {
    if (stateValue) {
      setRows([]);

      const query = {
        name: stateValue,
        limit: 3,
      };

      // const data = await getThesesBySearch(
      //   process.env.NEXT_PUBLIC_API_URL,
      //   new URLSearchParams(query).toString()
      // )

      // setRows(data)
    }
  }, [stateValue]);

  const notFoundComponent = (
    <p style={{ textAlign: "center" }}>
      Looks like we do not have what you need
    </p>
  );

  const foundComponent = (
    <>
      {rows.slice(0, 3).map((item) => (
        <NavSearchSuggestedItem
          key={item.id}
          details={item}
          handleChange={handleChange}
        />
      ))}

      <Button
        size="small"
        fullWidth
        className={mui.watchall}
        onClick={handleSearch}
      >
        See all
      </Button>
    </>
  );

  return (
    <div className={mui.root}>
      <SearchBar
        value={stateValue}
        placeholder="title or keyword"
        onChange={handleChange}
        onRequestSearch={handleSearch}
        onCancelSearch={handleChange}
        className={mui.searchbar}
      />

      {
        //
        stateValue && (
          <Box className={mui.suggestion}>
            {rows.length === 0 ? notFoundComponent : foundComponent}
          </Box>
        )
      }
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    margin: "0 15px",
  },

  searchbar: {
    width: "100%",
    maxWidth: 500,
    padding: 0,
    height: 35,

    "& input": {
      fontSize: "0.9rem",
    },
  },

  suggestion: {
    position: "absolute",
    top: 35,
    maxWidth: 400,
    width: "100%",
    borderRadius: 5,
    boxShadow: "3px 3px 2px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },

  watchall: {
    borderTop: "0.5px solid rgba(0,0,0,0.1)",
  },
}));
