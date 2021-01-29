import DateGenerator from "random-date-generator";

export const getGridData = (noOfRows = 10) => {
  let d = new Date(2021, 1, 31);
  let startDate = new Date(d.setMonth(d.getMonth() - 4));
  let endDate = new Date();
  let data = [];
  for (let i = 0; i < noOfRows; i++) {
    let randomAmount = Math.floor(Math.random() * 1000 + 1);
    let randomDate = DateGenerator.getRandomDateInRange(startDate, endDate);
    data.push({
      Id: i + 1,
      Description: `Order ID:${randomAmount}${i}`,
      "Amount Spent": `$ ${randomAmount}`,
      Date: randomDate.getTime(),
      "Credit Points Earned": calCreditPoints(randomAmount)
    });
  }
  return data;
};
export const getColDefs = () => {
  return [
    {
      field: "Id",
      valueFormatter: function (params) {
        return params.value ? params.value : "Total";
      }
    },
    {
      field: "Description"
    },
    {
      field: "Amount Spent",
      aggFunc: "sum"
    },
    {
      field: "Date",
      cellRenderer: "dateFieldCellRenderer"
    },
    {
      field: "Credit Points Earned",
      aggFunc: "sum"
    }
  ];
};
export const calCreditPoints = (price) => {
  if (price >= 50 && price < 100) {
    return price - 50;
  } else if (price > 100) {
    return 2 * (price - 100) + 50;
  }
  return 0;
};
export const reformatGridOnMonthlyBasis = ({ cols, data }) => {
  const formattedData = data.map((item) => {
    const month = {
      [new Date(
        Date.parse(new Date(item.Date).toDateString())
      ).toLocaleString("default", { month: "short" })]: item[
        "Credit Points Earned"
      ]
    };
    return { ...item, ...month };
  });
  const months = formattedData
    .sort((a, b) => {
      return new Date(a.Date).getTime() - new Date(b.Date).getTime();
    })
    .reduce(function (a, b) {
      let month = new Date(
        Date.parse(new Date(b.Date).toDateString())
      ).toLocaleString("default", { month: "short" });
      if (a.indexOf(month) < 0) a.push(month);
      return a;
    }, []);
  const formattedCols = [
    {
      headerName: "Details",
      marryChildren: true,
      children: [
        {
          field: "Id",
          colId: "Id",
          valueFormatter: function (params) {
            return params.value ? params.value : "Total";
          }
        },
        {
          field: "Description",
          colId: "Description"
        },
        {
          field: "Amount Spent",
          colId: "Amount Spent",
          aggFunc: "sum"
        }
      ]
    },
    {
      headerName: "Monthly Breakdown",
      marryChildren: true,
      children: months.map((item) => {
        return {
          field: item,
          colId: item,
          cellRenderer: "nullCellRenderer",
          aggFunc: "sum"
        };
      })
    }
  ];
  return { formattedCols, formattedData };
};
