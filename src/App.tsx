import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const validateDates = (dates: string[]) => {
  const RE = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  dates.forEach((element) => {
    if (!RE.test(element)) {
      throw new Error('invalid format');
    }
  });
};

function App() {
  const [mark, setMark] = useState(['2023-12-18', '2023-11-18']);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { input: { value: string } };
    const value = eval(target.input.value);

    validateDates(value);

    setMark(value);
  };
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Visualize the date
      </h1>

      <div className="justify-center align-middle flex">
        <Calendar
          tileContent={({ date }) => {
            if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              return (
                <div className="flex justify-center items-center">
                  <div className="w-2 h-2 bg-red-500 z-0 rounded-full flex"></div>
                </div>
              );
            }
          }}
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date Input
          </label>
          <input
            type="text"
            name="input"
            id="large-input"
            placeholder="['2023-11-18', '2023-11-19', '2023-11-20',]"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
