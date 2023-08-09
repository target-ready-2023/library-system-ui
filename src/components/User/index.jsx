import {
    Card,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
  } from "@mui/material";
import AddUser from "../AddUser";
import DeleteUser from "../DeleteUser";
const User = () => {

    const tableContainerStyles = {
        maxWidth: "1000px",
        margin: "0 auto",
        borderRadius: "10px",
        overflow: "hidden",
      };
    
      const tableStyles = {
        width: "100%",
        tableLayout: "fixed",
      };
    
      const tableHeaderCellStyles = {
        backgroundColor: "#f2f2f2",
        borderBottom: "1px solid #ddd",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "12px",
        textAlign: "center",
      };
    
      const tdStyles = {
        borderBottom: "1px solid #ddd",
        padding: "10px",
        textAlign: "left",
        fontSize: "16px",
      };
    
      const actionButtonsStyles = {
        display: "flex",
        justifyContent: "right",
        gap: "0.25px",
      };

    return (
        <Card className="App-Card">
            <h3>User directory</h3>
            <TableContainer component={Paper} style={tableContainerStyles}>
            <Table style={tableStyles}>
                <TableHead>
                    <TableRow>
                        <TableCell style={tableHeaderCellStyles} align="center">
                        No.
                        </TableCell>
                        <TableCell style={tableHeaderCellStyles} align="center">
                        User Name
                        </TableCell>
                        <TableCell style={tableHeaderCellStyles} align="center">
                        Role
                        </TableCell>
                        
                        <TableCell
                        style={{
                            backgroundColor: "#f2f2f2",
                            borderBottom: "1px solid #ddd",
                            fontSize: "18px",
                            fontWeight: "bold",
                            padding: "12px",
                            textAlign: "center",
                        }}
                        >
                        Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
               
                    <TableRow >
                    <TableCell align="center"><AddUser/></TableCell>
                    <TableCell align="center"><DeleteUser/></TableCell>
                    <TableCell align="center"></TableCell>
                    
                    <TableCell align="right" style={tdStyles}>
                        <div style={actionButtonsStyles}>
                        
                        </div>
                        
                    </TableCell>
                    </TableRow>
                
                </TableBody>
            </Table>
            </TableContainer>
        </Card>
    )
}
export default User;