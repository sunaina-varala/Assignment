import React, { useState, useRef, useEffect } from "react";
import Dropdown from "./components/atoms/dropdown/dropdown";
import {
  getColDefs,
  getGridData,
  reformatGridOnMonthlyBasis
} from "./utilities/utilities";
import Grid from "./components/molecules/grid";
import Button from "./components/atoms/button/button";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex: 1;
  flex-flow: column;
`;

const GridBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const App = () => {
  const [cols, setCols] = useState(getColDefs());
  const [data, setData] = useState(getGridData());
  const [isPeriodChanged, setIsPeriodChanged] = useState(false);
  const originalCols = useRef();
  const originalData = useRef();
  const points = data.reduce(
    (acc, key) => key["Credit Points Earned"] + acc,
    0
  );
  const optionsPeriod = ["All", "Last 3 Months"];
  useEffect(() => {
    originalCols.current = cols;
    originalData.current = data;
  });
  return (
    <div>
      <header>My Rewards</header>
      <main>
        <div>
          <h2>
            <span>{points}</span> Reward Points
          </h2>
          <span>Use Reward Point on Purchase</span>
        </div>
        <h2>Last Transactions</h2>
        <Section>
          <GridBtnWrapper>
            <Dropdown
              options={optionsPeriod}
              title="Select Period"
              defaultValue={optionsPeriod[0]}
              changeHandler={(value) => {
                if (value === optionsPeriod[1]) {
                  setIsPeriodChanged(true);
                  const {
                    formattedCols,
                    formattedData
                  } = reformatGridOnMonthlyBasis({ cols, data });
                  setData(formattedData);
                  setCols(formattedCols);
                } else {
                  setIsPeriodChanged(false);
                  setData(originalData.current);
                  setCols(getColDefs());
                }
              }}
              style={{ width: 150 }}
            />
            <Button
              text="Refresh Data"
              clickHandler={() => {
                if (isPeriodChanged) {
                  const {
                    formattedCols,
                    formattedData
                  } = reformatGridOnMonthlyBasis({ cols, data: getGridData() });
                  setData(formattedData);
                  setCols(formattedCols);
                } else {
                  setCols(getColDefs());
                  setData(getGridData());
                }
              }}
            />
          </GridBtnWrapper>
          <Grid cols={cols} data={data} />
        </Section>
      </main>
    </div>
  );
};
export default App;
