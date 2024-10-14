-- 1. Display average order amount for each customer ID
SELECT CustomerID, AVG(OrderAmount) AS AvgOrderAmount
FROM Orders
GROUP BY CustomerID;

-- 2. Show the total revenue generated by each product on '2023-09-05'
SELECT ProductID, SUM(Quantity * Price) AS TotalRevenue
FROM Sales
WHERE SaleDate = '2023-09-05'
GROUP BY ProductID;

-- 3. Find the employee with the highest performance rating. Display the Rating and Year
SELECT TOP 1
    EmployeeID, Rating, Year
FROM Performance
ORDER BY Rating DESC;

-- 4. Find the date with the highest quantity
SELECT TOP 1
    SaleDate, SUM(Quantity) AS TotalQuantity
FROM Sales
GROUP BY SaleDate
ORDER BY TotalQuantity DESC;

-- 5. List all customers who have never placed an order
SELECT CustomerID, CustomerName
FROM Customers
WHERE CustomerID NOT IN (SELECT CustomerID
FROM Orders);

-- 6. Calculate the total revenue generated from each product
SELECT ProductID, SUM(Quantity * Price) AS TotalRevenue
FROM Sales
GROUP BY ProductID;

-- 7. List the top 5 products based on Price
SELECT TOP 5
    ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC;

-- 8. List all employees who have received a performance rating higher than the average
--  rating in their department for 2023
SELECT e.EmployeeID, e.EmployeeName, p.Rating
FROM Employees e
    JOIN Performance p ON e.EmployeeID = p.EmployeeID
WHERE p.Year = 2023
    AND p.Rating > (SELECT AVG(p2.Rating)
    FROM Performance p2
    WHERE p2.DepartmentID = e.DepartmentID AND p2.Year = 2023);

-- 9. For each product, display the percentage of total revenue generated compared 
--  to the total revenue generated by all products combined
SELECT p.ProductID, p.ProductName,
    (SUM(s.Quantity * s.Price) * 100.0 / (SELECT SUM(Quantity * Price)
    FROM Sales)) AS RevenuePercentage
FROM Products p
    JOIN Sales s ON p.ProductID = s.ProductID
GROUP BY p.ProductID, p.ProductName;

-- 10. Display the running total of revenue for each product, ordered by sale date
SELECT ProductID, SaleDate,
    SUM(Quantity * Price) OVER (PARTITION BY ProductID ORDER BY SaleDate) AS RunningTotalRevenue
FROM Sales
ORDER BY ProductID, SaleDate;

-- 11. Find the first sale date and total revenue for each product. Display only 
--      those products where the total revenue exceeds $1000
WITH
    ProductRevenue
    AS
    (
        SELECT ProductID, MIN(SaleDate) AS FirstSaleDate, SUM(Quantity * Price) AS TotalRevenue
        FROM Sales
        GROUP BY ProductID
    )
SELECT ProductID, FirstSaleDate, TotalRevenue
FROM ProductRevenue
WHERE TotalRevenue > 1000;

-- 12. For each employee, find the average performance rating over the last 5 years, 
--  and compare this to the department's average rating for the same period. Display employees
--  whose performance is above their department’s average
WITH
    EmployeeAvgRating
    AS
    (
        SELECT e.EmployeeID, e.DepartmentID, AVG(p.Rating) AS AvgEmployeeRating
        FROM Employees e
            JOIN Performance p ON e.EmployeeID = p.EmployeeID
        WHERE p.Year BETWEEN YEAR(GETDATE()) - 5 AND YEAR(GETDATE())
        GROUP BY e.EmployeeID, e.DepartmentID
    ),
    DepartmentAvgRating
    AS
    (
        SELECT DepartmentID, AVG(Rating) AS AvgDeptRating
        FROM Performance
        WHERE Year BETWEEN YEAR(GETDATE()) - 5 AND YEAR(GETDATE())
        GROUP BY DepartmentID
    )
SELECT e.EmployeeID, e.AvgEmployeeRating, d.AvgDeptRating
FROM EmployeeAvgRating e
    JOIN DepartmentAvgRating d ON e.DepartmentID = d.DepartmentID
WHERE e.AvgEmployeeRating > d.AvgDeptRating;

-- 13. Identify customers who have placed at least two orders in each of the last three 
--  months (July, August, and September 2023). Display their names along with the number of orders placed in each month
SELECT c.CustomerName,
    SUM(CASE WHEN MONTH(o.OrderDate) = 7 THEN 1 ELSE 0 END) AS JulyOrders,
    SUM(CASE WHEN MONTH(o.OrderDate) = 8 THEN 1 ELSE 0 END) AS AugustOrders,
    SUM(CASE WHEN MONTH(o.OrderDate) = 9 THEN 1 ELSE 0 END) AS SeptemberOrders
FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE YEAR(o.OrderDate) = 2023
GROUP BY c.CustomerName
HAVING SUM(CASE WHEN MONTH(o.OrderDate) = 7 THEN 1 ELSE 0 END) >= 2
    AND SUM(CASE WHEN MONTH(o.OrderDate) = 8 THEN 1 ELSE 0 END) >= 2
    AND SUM(CASE WHEN MONTH(o.OrderDate) = 9 THEN 1 ELSE 0 END) >= 2;


-- 14. Find customers who have placed orders on more than 3 consecutive days
WITH
    ConsecutiveOrders
    AS
    (
        SELECT CustomerID, OrderDate,
            ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY OrderDate) - 
           DENSE_RANK() OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS DateGroup
        FROM Orders
    ),
    CustomerOrderGroups
    AS
    (
        SELECT CustomerID, MIN(OrderDate) AS StartDate, MAX(OrderDate) AS EndDate, COUNT(*) AS ConsecutiveDays
        FROM ConsecutiveOrders
        GROUP BY CustomerID, DateGroup
    )
SELECT c.CustomerID, c.CustomerName, g.StartDate, g.EndDate, g.ConsecutiveDays
FROM Customers c
    JOIN CustomerOrderGroups g ON c.CustomerID = g.CustomerID
WHERE g.ConsecutiveDays > 3;



-- Easy Level Questions

-- 1. Find the number of students born in each year.
SELECT YEAR(BirthDate) AS YearOfBirth, COUNT(*) AS NumberOfStudents
FROM Students
GROUP BY YEAR(BirthDate);

-- 2. List students whose last names start with the letter 'G' or 'H', ordered by last name.
SELECT *
FROM Students
WHERE LastName LIKE 'G%' OR LastName LIKE 'H%'
ORDER BY LastName;

-- 3. Write a query to display the youngest students (by birthdate).
SELECT TOP 1
    *
FROM Students
ORDER BY BirthDate DESC;

-- 4. Find students who share the same last name.
SELECT LastName, COUNT(*) AS NumberOfStudents
FROM Students
GROUP BY LastName
HAVING COUNT(*) > 1;

-- 5. Find students whose email contains the letter "z".
SELECT *
FROM Students
WHERE Email LIKE '%z%';

-- 6. Write a query to list students born in the first quarter (January to March) of any year.
SELECT *
FROM Students
WHERE MONTH(BirthDate) BETWEEN 1 AND 3;

-- 7. List all students born in the year 2000.
SELECT *
FROM Students
WHERE YEAR(BirthDate) = 2000;


-- Intermediate Level Questions

-- 8. Write a query to display each customer’s name, the total number of orders they have placed, and the 
-- total revenue they have generated. Include only customers who have generated more than 1,000 in revenue.
SELECT c.CustomerName, COUNT(o.OrderID) AS TotalOrders, SUM(o.OrderAmount) AS TotalRevenue
FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerName
HAVING SUM(o.OrderAmount) > 1000;

-- 9. Write a query to calculate the total number of orders and categorize the orders.
SELECT OrderID, OrderTotal,
    CASE 
           WHEN OrderTotal > 1000 THEN 'High Value'
           WHEN OrderTotal BETWEEN 500 AND 1000 THEN 'Medium Value'
           ELSE 'Low Value'
       END AS OrderCategory
FROM Orders;

-- 10. Recursive SQL query to find the Nth Fibonacci number.
WITH
    Fibonacci (n, FibonacciValue)
    AS
    (
                            SELECT 0, 0
        UNION ALL
            SELECT 1, 1
        UNION ALL
            SELECT n + 1, (SELECT TOP 1
                    FibonacciValue
                FROM Fibonacci
                ORDER BY n DESC) + (SELECT TOP 1
                    FibonacciValue
                FROM Fibonacci
                WHERE n < (SELECT MAX(n)
                FROM Fibonacci)
                ORDER BY n DESC)
            FROM Fibonacci
    )
SELECT FibonacciValue
FROM Fibonacci
WHERE n = @N;
-- Replace @N with the desired value of N.

-- 11. Calculate total sales for each sales representative, rank them, and calculate running total.
WITH
    SalesRank
    AS
    (
        SELECT SalesRepID, SUM(SalesAmount) AS TotalSales,
            RANK() OVER (ORDER BY SUM(SalesAmount) DESC) AS SalesRank
        FROM Sales
        GROUP BY SalesRepID
    )
SELECT SalesRepID, TotalSales, SalesRank,
    SUM(TotalSales) OVER (ORDER BY SalesRank) AS RunningTotal
FROM SalesRank;

-- 12. Retrieve names of employees who earn more than the average salary in departments with more than 3 employees.
WITH
    DeptAvgSalary
    AS
    (
        SELECT DepartmentID, AVG(Salary) AS AvgDeptSalary, COUNT(*) AS EmployeeCount
        FROM EmpList
        GROUP BY DepartmentID
        HAVING COUNT(*) > 3
    )
SELECT e.EmployeeName, d.DepartmentName, e.Salary
FROM EmpList e
    JOIN DeptList d ON e.DepartmentID = d.DepartmentID
    JOIN DeptAvgSalary das ON e.DepartmentID = das.DepartmentID
WHERE e.Salary > das.AvgDeptSalary
ORDER BY e.Salary DESC;


-- Hard Level Questions

-- 13. A. Calculate total hours worked by employees on each project, average hours per employee in department,
-- highest hours per employee in department, and list the employee who worked the most hours on each project.
WITH
    ProjectHours
    AS
    (
        SELECT p.ProjectName, s.EmployeeID, s.DepartmentID, SUM(sp.HoursWorked) AS TotalHoursWorked
        FROM StaffProjects sp
            JOIN Projects p ON sp.ProjectID = p.ProjectID
            JOIN Staff s ON sp.EmployeeID = s.EmployeeID
        GROUP BY p.ProjectName, s.EmployeeID, s.DepartmentID
    ),
    DeptStats
    AS
    (
        SELECT DepartmentID, AVG(TotalHoursWorked) AS AvgHoursWorked, MAX(TotalHoursWorked) AS MaxHoursWorked
        FROM ProjectHours
        GROUP BY DepartmentID
    ),
    TopEmployeeProject
    AS
    (
        SELECT ProjectName, EmployeeID, TotalHoursWorked,
            RANK() OVER (PARTITION BY ProjectName ORDER BY TotalHoursWorked DESC) AS Rank
        FROM ProjectHours
    )
SELECT p.ProjectName, s.EmployeeName, ph.TotalHoursWorked, d.AvgHoursWorked, d.MaxHoursWorked
FROM TopEmployeeProject ph
    JOIN Staff s ON ph.EmployeeID = s.EmployeeID
    JOIN DeptStats d ON ph.DepartmentID = d.DepartmentID
WHERE ph.Rank = 1;

-- 13. B. Determine the average salary for each department, employees who earn more than the average,
--  and their rank within the department based on salary.
WITH
    DeptAvgSalary
    AS
    (
        SELECT DepartmentID, AVG(Salary) AS AvgDeptSalary
        FROM Staff
        GROUP BY DepartmentID
    ),
    EmployeeSalaryRank
    AS
    (
        SELECT s.EmployeeID, s.DepartmentID, s.Salary,
            RANK() OVER (PARTITION BY s.DepartmentID ORDER BY s.Salary DESC) AS SalaryRank
        FROM Staff s
    )
SELECT s.EmployeeName, d.DepartmentName, es.Salary, es.SalaryRank
FROM EmployeeSalaryRank es
    JOIN Staff s ON es.EmployeeID = s.EmployeeID
    JOIN DeptList d ON es.DepartmentID = d.DepartmentID
    JOIN DeptAvgSalary das ON es.DepartmentID = das.DepartmentID
WHERE es.Salary > das.AvgDeptSalary
ORDER BY es.SalaryRank;



---------------------------------------------------------------------------------------------------------










-- 1. Find total number of items sold on 2024-02-29
SELECT SUM(Quantity) AS TotalItemsSold
FROM Transactions
WHERE TransactionDate = '2024-02-29';

-- 2. Find all purchases made by clients whose ClientName starts with 'E'
SELECT p.*
FROM Clients c
    JOIN Purchases p ON c.ClientID = p.ClientID
WHERE c.ClientName LIKE 'E%';

-- 3. Find items that have sold more than 25 units in total
SELECT ItemID, SUM(Quantity) AS TotalUnitsSold
FROM Transactions
GROUP BY ItemID
HAVING SUM(Quantity) > 25;

-- 4. Find all orders placed either on the first day or the last day of any month
SELECT *
FROM Orders
WHERE DAY(OrderDate) = 1 OR DAY(OrderDate) = DAY(EOMONTH(OrderDate));

-- 5. Find all clients who have made at least one purchase
SELECT DISTINCT c.ClientID, c.ClientName
FROM Clients c
    JOIN Purchases p ON c.ClientID = p.ClientID;

-- 6. Count transactions happened on Saturday, Sunday, and Monday
SELECT DATENAME(WEEKDAY, TransactionDate) AS DayOfWeek, COUNT(*) AS TotalTransactions
FROM Transactions
WHERE DATENAME(WEEKDAY, TransactionDate) IN ('Saturday', 'Sunday', 'Monday')
GROUP BY DATENAME(WEEKDAY, TransactionDate);

-- 7. Display PurchaseID, PurchaseDate, and a flag 'Late' if the purchase date is after '2024-02-25'
SELECT PurchaseID, PurchaseDate,
    CASE 
           WHEN PurchaseDate > '2024-02-25' THEN 'Late'
           ELSE 'On Time'
       END AS Status
FROM Purchases;


-- Section B

-- 8. Calculate total quantity sold for each ProductCategory, rank them, and display only categories with 
--      total Quantity exceeding the overall average
WITH
    CategoryTotals
    AS
    (
        SELECT pd.ProductCategory, SUM(sr.Quantity) AS TotalQuantity
        FROM SalesRecord sr
            JOIN ProductDetails pd ON sr.ProductID = pd.ProductID
        GROUP BY pd.ProductCategory
    ),
    AvgQuantity
    AS
    (
        SELECT AVG(TotalQuantity) AS OverallAvgQuantity
        FROM CategoryTotals
    )
SELECT ct.ProductCategory, ct.TotalQuantity,
    RANK() OVER (ORDER BY ct.TotalQuantity DESC) AS CategoryRank
FROM CategoryTotals ct
    JOIN AvgQuantity aq ON ct.TotalQuantity > aq.OverallAvgQuantity;

-- 9. List products sold from June to August, categorize as 'High Demand' or 'Low Demand', 
--      and display the count for each category
WITH
    ProductSales
    AS
    (
        SELECT pd.ProductID, pd.ProductName, SUM(sr.Quantity) AS TotalQuantity
        FROM SalesRecord sr
            JOIN ProductDetails pd ON sr.ProductID = pd.ProductID
        WHERE MONTH(sr.SaleDate) BETWEEN 6 AND 8
        GROUP BY pd.ProductID, pd.ProductName
    ),
    AvgSales
    AS
    (
        SELECT AVG(TotalQuantity) AS AvgProductSales
        FROM ProductSales
    )
SELECT ps.ProductName, ps.TotalQuantity,
    CASE 
           WHEN ps.TotalQuantity > a.AvgProductSales THEN 'High Demand'
           ELSE 'Low Demand'
       END AS DemandCategory
FROM ProductSales ps
    JOIN AvgSales a ON 1=1;

-- Count High Demand and Low Demand products
SELECT DemandCategory, COUNT(*) AS ProductCount
FROM (
    SELECT ps.ProductName, ps.TotalQuantity,
        CASE 
               WHEN ps.TotalQuantity > a.AvgProductSales THEN 'High Demand'
               ELSE 'Low Demand'
           END AS DemandCategory
    FROM ProductSales ps
        JOIN AvgSales a ON 1=1
) AS DemandSummary
GROUP BY DemandCategory;

-- 10. Calculate total quantity ordered by each client from Jan to June, show average 
--      quantity ordered by all clients, and show top 3 clients
WITH
    ClientOrders
    AS
    (
        SELECT ClientID, SUM(Quantity) AS TotalQuantity
        FROM OrdersLog
        WHERE MONTH(OrderDate) BETWEEN 1 AND 6
        GROUP BY ClientID
    ),
    AvgOrders
    AS
    (
        SELECT AVG(TotalQuantity) AS AvgClientOrders
        FROM ClientOrders
    )
SELECT TOP 3
    co.ClientID, co.TotalQuantity, ao.AvgClientOrders
FROM ClientOrders co
    JOIN AvgOrders ao ON 1=1
ORDER BY co.TotalQuantity DESC;

-- 11. List customers who placed orders with total quantity > average and had deliveries after March 10, 2024
WITH
    CustomerTotals
    AS
    (
        SELECT ol.ClientID, SUM(ol.Quantity) AS TotalQuantity
        FROM OrdersLog ol
        GROUP BY ol.ClientID
    ),
    AvgCustomerTotals
    AS
    (
        SELECT AVG(TotalQuantity) AS AvgTotalQuantity
        FROM CustomerTotals
    )
SELECT c.CustomerName, ol.ClientID, SUM(ol.Quantity) AS TotalQuantity
FROM OrdersLog ol
    JOIN DeliveryLog dl ON ol.OrderID = dl.OrderID
    JOIN Customers c ON ol.ClientID = c.ClientID
WHERE dl.DeliveryDate > '2024-03-10'
    AND ol.ClientID IN (
    SELECT ct.ClientID
    FROM CustomerTotals ct
        JOIN AvgCustomerTotals act ON ct.TotalQuantity > act.AvgTotalQuantity
)
GROUP BY c.CustomerName, ol.ClientID;

-- 12. Calculate average tenure (in years) of employees mapped under each manager, rank managers, and categorize them
WITH
    ManagerTenure
    AS
    (
        SELECT ManagerID, AVG(YEAR(GETDATE()) - HireYear) AS AvgTenure
        FROM OrganizationStructure
        GROUP BY ManagerID
    ),
    RankedManagers
    AS
    (
        SELECT ManagerID, AvgTenure,
            RANK() OVER (ORDER BY AvgTenure DESC) AS ManagerRank
        FROM ManagerTenure
        WHERE AvgTenure > 3
    )
SELECT ManagerID, AvgTenure, ManagerRank,
    CASE 
           WHEN ManagerRank <= 2 THEN 'Junior'
           WHEN ManagerRank BETWEEN 3 AND 4 THEN 'Senior I'
           ELSE 'Senior II'
       END AS Category
FROM RankedManagers;


-- Section C

-- 13. A query to find the number of orders delivered in the same month and the Order IDs 
--      with the least and most number of days to delivery
WITH
    DeliveryDays
    AS
    (
        SELECT ol.ItemID, ol.ClientID, ol.Quantity, ol.OrderDate, dl.DeliveryDate,
            DATEDIFF(DAY, ol.OrderDate, dl.DeliveryDate) AS DaysToDelivery
        FROM OrdersLog ol
            JOIN DeliveryLog dl ON ol.OrderID = dl.OrderID
    ),
    SameMonthDeliveries
    AS
    (
        SELECT COUNT(*) AS OrdersSameMonth
        FROM DeliveryDays
        WHERE MONTH(OrderDate) = MONTH(DeliveryDate)
    ),
    DeliveryStats
    AS
    (
        SELECT ItemID, MIN(DaysToDelivery) AS MinDays, MAX(DaysToDelivery) AS MaxDays
        FROM DeliveryDays
    )
SELECT dd.ItemID, dd.ClientID, dd.Quantity, dd.OrderDate, dd.DeliveryDate, dd.DaysToDelivery,
    (SELECT OrdersSameMonth
    FROM SameMonthDeliveries) AS OrdersDeliveredSameMonth,
    ds.MinDays AS OrderWithLeastDays, ds.MaxDays AS OrderWithMostDays
FROM DeliveryDays dd
    JOIN DeliveryStats ds ON dd.ItemID = ds.ItemID;


-- 14 A - Find the ItemID that had the largest drop in sales compared to the previous month in 2024
WITH
    MonthlySales
    AS
    (
        SELECT ItemID, MONTH(TransactionDate) AS SaleMonth, SUM(Quantity) AS MonthlySales
        FROM Transactions
        WHERE YEAR(TransactionDate) = 2024
        GROUP BY ItemID, MONTH(TransactionDate)
    ),
    SalesComparison
    AS
    (
        SELECT ms.ItemID, ms.SaleMonth, ms.MonthlySales AS CurrentMonthSales,
            ISNULL(pm.MonthlySales, 0) AS PreviousMonthSales,
            (ISNULL(pm.MonthlySales, 0) - ms.MonthlySales) AS SalesDrop
        FROM MonthlySales ms
            LEFT JOIN MonthlySales pm
            ON ms.ItemID = pm.ItemID AND ms.SaleMonth = pm.SaleMonth + 1
    )
SELECT TOP 1
    ItemID, SaleMonth, CurrentMonthSales, PreviousMonthSales, SalesDrop
FROM SalesComparison
ORDER BY SalesDrop DESC;


-- 14 B - Find the number of employees directly reporting to each manager, 
-- and filter managers with more than the average direct reports
WITH
    DirectReports
    AS
    (
        SELECT ManagerID, COUNT(EmployeeID) AS DirectReportsCount
        FROM OrganizationStructure
        WHERE ManagerID IS NOT NULL
        GROUP BY ManagerID
    ),
    AvgDirectReports
    AS
    (
        SELECT AVG(DirectReportsCount) AS AvgDirectReports
        FROM DirectReports
    )
SELECT dr.ManagerID, os.ManagerName, dr.DirectReportsCount
FROM DirectReports dr
    JOIN OrganizationStructure os ON dr.ManagerID = os.ManagerID
WHERE dr.DirectReportsCount > (SELECT AvgDirectReports
FROM AvgDirectReports);