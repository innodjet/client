import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/button/Button";
import Accordion from "../../components/accordion/Accordion";
import Input from "../../components/input/Input";
import LineChart from "../../ ../../components/lineChart/LineChart";
import { months } from "../../helper/Helper";

const Content = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({
    data: "",
    description: "",
  });
  const [accordion, setAccordion] = useState(true);
  const [newTemp, setNewTemp] = useState("");
  const [selectData, setSelectData] = useState();
  const [lastTempData, setLastTempData] = useState({
    year: "",
    temperature: "",
  });
  const [yearRange, setYearRange] = useState({
    from: "",
    to: "",
  });
  const [initialChartData, setInitialChartData] = useState({
    data: "",
    description: "",
  });
  const [initialYearRange, setInitialYearRange] = useState({
    from: "",
    to: "",
  });

  let fromSelectRef = null;
  let toSelectRef = null;

  let fromMonthSelectRef = null;
  let toMonthSelectRef = null;

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api");
      const { data, description } = response.data;
      const keys = Object.keys(data);
      const chartData = formatData(keys, data);
      const fromYear = Number(keys[0]);
      const toYear = Number(keys[keys.length - 1]);
      setInitialYearRange({
        from: { value: fromYear },
        to: { value: toYear },
      });
      setYearRange({
        from: { value: fromYear },
        to: { value: toYear },
      });
      setIsLoading(false);
      setInitialChartData({
        ...chartData,
        data: chartData,
        description,
      });
      setChartData({
        ...chartData,
        data: chartData,
        description,
      });
      setLastTempData({
        year: keys[keys.length - 1],
        temperature: data[keys[keys.length - 1]],
      });
      setSelectData(
        keys.map((el) => {
          return { value: el, label: el };
        })
      );
    } catch (e) {
      alert("ERROR LOADING APP DATA");
    }
  };

  const formatData = (keys, data) =>
    keys.map((el) => {
      return {
        year: Number(el),
        temperature: Number(data[el]),
      };
    });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => setNewTemp(e.target.value);

  const removeLastTemp = () => {
    if (chartData.data.length > 1) {
      chartData.data.pop();
      const newChartData = chartData.data;
      const newItemToBeRemoved = newChartData[newChartData.length - 1];
      setChartData({
        ...chartData,
        data: newChartData,
      });
      setLastTempData(newItemToBeRemoved);
    }
  };

  const addTemp = () => {
    if (newTemp) {
      const newYear = Number(lastTempData.year) + 1;
      const newTempData = {
        year: newYear,
        temperature: Number(newTemp),
      };
      setChartData({
        ...chartData,
        data: [...chartData.data, newTempData],
      });
      setYearRange({
        ...yearRange,
        to: { value: newYear },
      });
      setLastTempData(newTempData);
      setNewTemp("");
    }
  };

  const onSelect = (selectedOption, name) => {
    if (selectedOption) {
      setYearRange({
        ...yearRange,
        [name]: { value: selectedOption.value },
      });
    }
  };

  const resetDates = () => {
    fromSelectRef.clearValue();
    toSelectRef.clearValue();
    fromMonthSelectRef.clearValue();
    toMonthSelectRef.clearValue();
    setChartData({
      ...chartData,
      data: initialChartData.data,
    });
    setYearRange(initialYearRange);
  };

  const { temperature } = lastTempData;
  const { data, description } = chartData;
  const { from, to } = yearRange;

  return (
    <div className="container">
      {!isLoading && data ? (
        <>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="FormControlInput" className="form-label">
                From:
              </label>
              <div className="row">
                <div className="col-sm-6">
                  <div className="custom-select-wrapper">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      options={selectData}
                      ref={(ref) => {
                        fromSelectRef = ref;
                      }}
                      name="from"
                      onChange={(selectedOption) =>
                        onSelect(selectedOption, "from")
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <Select
                    ref={(ref) => {
                      fromMonthSelectRef = ref;
                    }}
                    options={months}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="FormControlInput" className="form-label">
                To:
              </label>
              <div className="row">
                <div className="col-sm-6">
                  <Select
                    options={selectData}
                    name="to"
                    ref={(ref) => {
                      toSelectRef = ref;
                    }}
                    onChange={(selectedOption) =>
                      onSelect(selectedOption, "to")
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <Select
                    ref={(ref) => {
                      toMonthSelectRef = ref;
                    }}
                    options={months}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Button
                title="Reset Dates"
                onClick={resetDates}
                className="btn btn-primary"
                style={{ marginTop: "32px" }}
              />
            </div>
          </div>
          <div className="chart my-3">
            <LineChart
              chartData={data.filter(
                (el) => el.year >= from.value && el.year <= to.value
              )}
              description={description}
            />
          </div>
          <div className="row">
            <div className="col-md-6 my-3">
              <Accordion
                onClick={() => setAccordion(!accordion)}
                show={accordion}
                headerTitle="Add Temperature Value"
              >
                <div className="mb-3">
                  <Input
                    inputType="text"
                    placeholder="Enter"
                    value={newTemp}
                    name="newTemp"
                    onchange={(e) => handleChange(e)}
                    label="Temperature"
                  />
                </div>
                <div className="mb-3">
                  <Button
                    title="Add"
                    onClick={() => addTemp()}
                    className="btn btn-primary"
                  />
                </div>
              </Accordion>
            </div>
            <div className="col-md-6 my-3">
              <Accordion
                onClick={() => setAccordion(!accordion)}
                show={!accordion}
                headerTitle="Remove Last Temperature Value"
              >
                <div className="mb-3">
                  <Input
                    inputType="text"
                    placeholder=""
                    value={temperature}
                    label="Last Value"
                    readOnly={true}
                  />
                </div>
                <div className="mb-3">
                  <Button
                    title="Remove"
                    onClick={() => removeLastTemp()}
                    className="btn btn-secondary"
                  />
                </div>
              </Accordion>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center my-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Content;
