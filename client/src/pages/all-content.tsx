import { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Stack, Typography, TextField, Select, MenuItem } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { ContentCard, CustomButton } from "components";

const AllContent = () => {
  const navigate = useNavigate();
  const { 
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allContent = data?.data ?? [];
  // const currentType = sorter.find((item) => item.field === "contentType");

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ("field" in item ? [item] : []));

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      contentType: logicalFilters.find((item) => item.field === "contentType")?.value || "",
    }
  }, [filters]);

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error...</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142D">{!allContent.length ? "There's no content" : "All Content"}</Typography>
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: "20px", sm: 0 }}>
              {/* <CustomButton
                title="Sort Content Type"
                handleClick={() => {}}
                backgroundColor="#475be8"
                color="#fcfcfc"
              /> */}
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value ? e.currentTarget.value : undefined,
                    },
                  ]);
                }}
              />
              <Select 
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.contentType}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "contentType",
                      operator: "eq",
                      value: e.target.value
                    },
                  ], "replace");
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["quinky", "kinky", "cute"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton 
          title="Add Content"
          handleClick={() => navigate("../content/create", { replace: true })}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allContent.map((content) => (
          <ContentCard
            key={content._id}
            id={content._id}
            title={content.title}
            photo={content.photo}
            contentType={content.contentType}
          />
        ))}
      </Box>

      {allContent.length > 0 && (
        <Box display="flex" gap={3} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent(prev => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: "hidden", sm: "flex" }} alignItems="center" gap="5px">
            Page{" "}<strong>{current}</strong> of <strong>{pageCount}</strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent(prev => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select 
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) => {
              setPageSize(e.target.value ? Number(e.target.value) : 10);
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllContent;