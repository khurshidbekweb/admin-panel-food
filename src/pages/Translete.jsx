import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ALL_DATA } from "../Query/ALL_DATA";
import { BiEdit, BiTrash } from "react-icons/bi";
import AddTranslete from "../Modals/AddTranslete";

const Translate = () => {
  const language = ALL_DATA.useLanguage();
  const translate = ALL_DATA.useTranslete();

  return (
    <>
      <div className="flex justify-between px-3">
        <p>Add Translate</p>
        <AddTranslete />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: 5 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              {language.data?.length &&
                language.data.map((code) => {
                  return <TableCell key={code._id}>{code.title}</TableCell>;
                })}
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {translate.data?.length &&
              translate.data.map((tr, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ width: "15px" }}>{i + 1}</TableCell>
                  {tr.definitions.map((code) => {
                    return <TableCell key={code._id}>{code.value}</TableCell>;
                  })}
                  <TableCell
                    sx={
                      tr.status === "active"
                        ? {
                            width: "15px",
                            color: "white",
                            backgroundColor: "green",
                          }
                        : {
                            width: "15px",
                            color: "white",
                            backgroundColor: "red",
                          }
                    }
                  >
                    {tr.status}
                  </TableCell>
                  <TableCell sx={{ width: "15px" }}>
                    <BiEdit />
                  </TableCell>
                  <TableCell sx={{ width: "15px" }}>
                    <BiTrash />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Translate;
