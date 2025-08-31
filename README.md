# React CO2 Data App – Performance Profiling

## Before Optimization

| Action         | Commit Duration (ms) | Render Duration (ms) | Passive Effect (ms) | Layout Effect (ms) | Notes                    | Profiler Screenshot                                                                                              |
| -------------- | -------------------- | -------------------- | ------------------- | ------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Change Year    | 8300                 | 97.3                 | -                   | 0.1                | Updated year in selector | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/changeYearFirst.PNG?raw=true) |
| Sort by Name   | 4600                 | 325.1                | 21                  | 0.1                | Sorted countries by name | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/sortNameFirst.PNG?raw=true)   |
| Search Country | 16800                | 270.6                | -                   | 0.1                | Searched country by name | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/countryFirst.PNG?raw=true)    |

## After Optimization

| Action         | Commit Duration (ms) | Render Duration (ms) | Passive Effect (ms) | Layout Effect (ms) | Notes                    | Profiler Screenshot                                                                                             |
| -------------- | -------------------- | -------------------- | ------------------- | ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Change Year    | 4600                 | 136.5                | 13                  | <0.1               | Updated year in selector | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/changeSecond.PNG?raw=true)   |
| Sort by Name   | 3500                 | 132.7                | 14                  | 0.2                | Sorted countries by name | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/sortNameSecond.PNG?raw=true) |
| Search Country | 4600                 | 49.9                 | 0.7                 | <0.1               | Searched country by name | ![Profiler](https://github.com/Nadin-Nov/REACT2025Q3/blob/react-performance/public/countrySecond.PNG?raw=true)  |
