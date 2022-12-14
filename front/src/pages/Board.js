// import React, { Component } from "react";
// import "./styles.css";
// import axios from "axios";
// import MUIDataTable from "mui-datatables";
// import { CircularProgress, Typography } from "@material-ui/core";
// import { confirmAlert } from "react-confirm-alert";

// const api = axios.create({
//   baseURL: `http://localhost:5000/api`
// });

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       page: 1,
//       count: 1,
//       rowsPerpage: 10,
//       sortOrder: {},
//       isLoading: false,
//       data: [],
//       editData: [],
//       equipment: []
//     };

//     //handler
//     this.handleAddBtn = this.handleAddBtn.bind(this);
//   }

//   componentDidMount() {
//     // this.setState({ isLoading: true });
//     // api
//     //   .get(
//     //     `/equipment?pageNumber=${this.state.page}&pageSize=${this.state.rowsPerpage}`
//     //   )
//     //   .then((res) => {
//     //     this.setState({
//     //       data: res.data.data,
//     //       isLoading: false,
//     //       page: res.data.pageNumber,
//     //       count: res.data.totalRecords
//     //     });
//     //     console.log("data: " + JSON.stringify(res.data.totalRecords));
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });
//     this.getData();
//   }

//   getData = () => {
//     this.setState({
//       ...this.state,
//       data: this.getDateSrc()[0].data,
//       isLoading: false,
//       page: this.getDateSrc()[0].pageNumber,
//       count: this.getDateSrc()[0].totalRecords
//     });
//   };

//   //Example of the data that is return from my local API
//   getDateSrc = () => {
//     return [
//       {
//         pageNumber: 1,
//         pageSize: 10,
//         firstPage: null,
//         lastPage: null,
//         totalPages: 0,
//         totalRecords: 14,
//         nextPage: null,
//         previousPage: null,
//         data: [
//           {
//             id: 3,
//             name: "Lenovo_Yoga11",
//             location: "Rue Neuve 123, 1000 Bruxelles",
//             description: "Lenovo Yoga S940",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-09-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 7,
//             name: "Toshiba_Satellite11",
//             location: "Boulevard Lambermont 1, 1000 Bruxelles",
//             description: "Toshiba Satellite C55-B5300 16-Inch Laptop",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-08-19T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 5,
//             name: "Toshib_Satellite y11",
//             location: "Chaussée d'Ixelles 84/86, 1050 Ixelles",
//             description: "Toshiba Satellite S55-C5274 15.6 Inch",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-08-05T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 4,
//             name: "Lenovo_Ideapad11",
//             location: "Boulevard Sylvain Dupuis 433, 1070 Anderlecht",
//             description: "Lenovo Ideapad 330-15ARR",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-08-02T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 2,
//             name: "Lenovo_Legion11",
//             location: "Chaussée de Louvain 610, 1030 Schaerbeek",
//             description: "Lenovo Legion Y740 (81UH006YIN)",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-08-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 6,
//             name: "TOSHIBA_Laptop11",
//             location: "Rue Saint-Lambert 200, 1200 Woluwe-Saint-Lambert",
//             description: "TOSHIBA Laptop Tecra A50-01R01S Intel Core i7",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-07-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 1,
//             name: "Lenovo_IdeaPad_Slim_311",
//             location: "Berchem-Sainte-Agathe",
//             description: null,
//             picturePath: null,
//             status: "Operating",
//             dateAdded: null,
//             maintenances: []
//           }
//         ],
//         succeeded: true,
//         errors: null,
//         message: null
//       },
//       {
//         pageNumber: 2,
//         pageSize: 10,
//         firstPage: null,
//         lastPage: null,
//         totalPages: 0,
//         totalRecords: 14,
//         nextPage: null,
//         previousPage: null,
//         data: [
//           {
//             id: 3,
//             name: "Lenovo_Yoga22",
//             location: "Rue Neuve 123, 1000 Bruxelles",
//             description: "Lenovo Yoga S940",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-09-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 7,
//             name: "Toshiba_Satellite22",
//             location: "Boulevard Lambermont 1, 1000 Bruxelles",
//             description: "Toshiba Satellite C55-B5300 16-Inch Laptop",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-08-19T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 5,
//             name: "Toshib_Satellite y22",
//             location: "Chaussée d'Ixelles 84/86, 1050 Ixelles",
//             description: "Toshiba Satellite S55-C5274 15.6 Inch",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-08-05T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 4,
//             name: "Lenovo_Ideapad22",
//             location: "Boulevard Sylvain Dupuis 433, 1070 Anderlecht",
//             description: "Lenovo Ideapad 330-15ARR",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-08-02T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 2,
//             name: "Lenovo_Legion22",
//             location: "Chaussée de Louvain 610, 1030 Schaerbeek",
//             description: "Lenovo Legion Y740 (81UH006YIN)",
//             picturePath: null,
//             status: "Operating",
//             dateAdded: "2020-08-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 6,
//             name: "TOSHIBA_Laptop22",
//             location: "Rue Saint-Lambert 200, 1200 Woluwe-Saint-Lambert",
//             description: "TOSHIBA Laptop Tecra A50-01R01S Intel Core i7",
//             picturePath: null,
//             status: "Maintenance",
//             dateAdded: "2020-07-01T00:00:00",
//             maintenances: []
//           },
//           {
//             id: 1,
//             name: "Lenovo_IdeaPad_Slim_322",
//             location: "Berchem-Sainte-Agathe",
//             description: null,
//             picturePath: null,
//             status: "Operating",
//             dateAdded: null,
//             maintenances: []
//           }
//         ],
//         succeeded: true,
//         errors: null,
//         message: null
//       }
//     ];
//   };

//   changePage = (page) => {
//     this.setState({ isLoading: true });

//     api
//       .get(`/equipment?pageNumber=${page}&pageSize=${this.state.rowsPerpage}`)
//       .then((res) => {
//         this.setState({
//           data: res.data.data,
//           isLoading: false,
//           page: res.data.pageNumber,
//           count: res.data.totalRecords
//         });
//         console.log("data: " + res.data.data);
//       })
//       .catch((error) => {
//         this.setState({
//           ...this.state,
//           data: this.getDateSrc()[page].data,
//           isLoading: false,
//           page: this.getDateSrc()[page].pageNumber,
//           count: this.getDateSrc()[page].totalRecords
//         });
//       });
//   };

//   sort = (page) => {
//     this.setState({ isLoading: true });

//     api
//       .get(`/equipment?pageNumber=${page}&pageSize=${this.state.rowsPerpage}`)
//       .then((res) => {
//         this.setState({
//           data: res.data.data,
//           isLoading: false,
//           page: res.data.pageNumber,
//           count: res.data.totalRecords
//         });
//         console.log("data: " + res.data.data);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };

//   delete(dataIndex) {
//     let equipment = this.state.data[dataIndex];

//     confirmAlert({
//       title: "",
//       message: "Do you really want to do this?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             api
//               .delete("/equipment/" + equipment.id)
//               .then((res) => {
//                 window.location.reload();
//               })
//               .catch((error) => {
//                 alert(error);
//               });
//           }
//         },
//         {
//           label: "No",
//           onClick: () => {}
//         }
//       ]
//     });
//   }

//   handleAddBtn() {
//     this.setState({ addComposeModal: true });
//   }

//   render() {
//     const columns = [
//       {
//         name: "Delete",
//         options: {
//           filter: false,
//           sort: false,
//           empty: true,

//           customBodyRenderLite: (dataIndex) => {
//             return (
//               <i
//                 className="fa fa-trash"
//                 aria-hidden="true"
//                 id="deleteIcon"
//                 onClick={() => {
//                   this.delete(dataIndex);
//                 }}
//               />
//             );
//           }
//         }
//       },
//       {
//         name: "Edit",
//         options: {
//           filter: false,
//           sort: false,
//           empty: true,
//           customBodyRenderLite: (dataIndex) => {
//             const val = dataIndex;
//             return (
//               <i
//                 className="fa fa-pencil-square-o"
//                 aria-hidden="true"
//                 id="editIcon"
//                 onClick={() => {
//                   const data = this.state.data[val];
//                   this.setState({ editData: data, editShow: true });
//                 }}
//               />
//             );
//           }
//         }
//       },
//       {
//         name: "name",
//         label: "Name",
//         options: {
//           filter: true,
//           customBodyRenderLite: (dataIndex) => {
//             return <span>{this.state.data[dataIndex].name}</span>;
//           }
//         }
//       },
//       {
//         name: "description",
//         label: "Description",
//         options: {
//           filter: true,
//           customBodyRenderLite: (dataIndex) => {
//             return <span>{this.state.data[dataIndex].description}</span>;
//           }
//         }
//       },
//       {
//         name: "status",
//         label: "State",
//         options: {
//           filter: true,
//           customBodyRenderLite: (dataIndex) => {
//             const state = this.state.data[dataIndex].status;
//             if (state === "Operating") {
//               return (
//                 <div className="operating">
//                   <span>{state}</span>
//                 </div>
//               );
//             } else {
//               return (
//                 <div className="maintenance">
//                   <span>{state}</span>
//                 </div>
//               );
//             }
//           }
//         }
//       },
//       {
//         name: "location",
//         label: "Location",
//         options: {
//           filter: true,
//           customBodyRenderLite: (dataIndex) => {
//             return <span>{this.state.data[dataIndex].location}</span>;
//           }
//         }
//       },
//       {
//         name: "dateAdded",
//         label: "Date Added",
//         options: {
//           filter: true,
//           customBodyRenderLite: (dataIndex) => {
//             return <span>{this.state.data[dataIndex].dateAdded}</span>;
//           }
//         }
//       }
//     ];

//     const { data, count, isLoading, rowsPerpage } = this.state;

//     const options = {
//       filter: true,
//       filterType: "dropdown",
//       responsive: "vertical",
//       download: false,
//       serverSide: true,
//       print: false,
//       count: count,
//       rowsPerpage: rowsPerpage,
//       rowsPerPageOptions: [],
//       selectableRowsHideCheckboxes: false,
//       selectableRows: "none",
//       selectableRowsHeader: false,
//       onColumnSortChange: (changedColumn, direction) =>
//         console.log("changedColumn: ", changedColumn, "direction: ", direction),
//       onChangeRowsPerPage: (numberOfRows) =>
//         console.log("numberOfRows: ", numberOfRows),
//       onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
//       onTableChange: (action, tableState) => {
//         console.log(action, tableState);

//         switch (action) {
//           case "changePage":
//             this.changePage(tableState.page);
//             break;
//           case "sort":
//             this.sort(tableState.page);
//             break;
//           default:
//             console.log("action not handled.");
//         }
//       }
//     };

//     return (
//       <div className="home">
//         <div className="btnContainer">
//           <span>New Equipment</span>
//           <i
//             id="addIcon"
//             className="fa fa-plus-circle"
//             aria-hidden="true"
//             onClick={this.handleAddBtn}
//           ></i>
//         </div>
//         <MUIDataTable
//           title={
//             <Typography variant="h6">
//               List of Equipments
//               {isLoading && (
//                 <CircularProgress
//                   size={24}
//                   style={{ marginLeft: 15, position: "relative", top: 4 }}
//                 />
//               )}
//             </Typography>
//           }
//           data={data}
//           columns={columns}
//           options={options}
//         />
//       </div>
//     );
//   }
// }
