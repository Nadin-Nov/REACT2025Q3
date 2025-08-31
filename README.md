# React CO2 Data App – Performance Profiling

## Profiling Results

| Action         | Commit Duration (ms) | Render Duration (ms) | Passive Effect (ms) | Layout Effect (ms) | Notes                    | Profiler Screenshot               |
| -------------- | -------------------- | -------------------- | ------------------- | ------------------ | ------------------------ | --------------------------------- |
| Change Year    | 8300                 | 97.3                 | -                   | 0.1                | Updated year in selector | ![Profiler](/changeYearFirst.PNG) |
| Sort by Name   | 4600                 | 325.1                | 21                  | 0.1                | Sorted countries by name | ![Profiler](/sortNameFirst.PNG)   |
| Search Country | 16800                | 270.6                | -                   | 0.1                | Searched country by name | ![Profiler](/countryFirst.PNG)    |
