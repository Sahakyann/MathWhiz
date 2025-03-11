namespace aspnetserver.Data.Structures
{
    public class Matrix
    {
        public int Rows { get; }
        public int Cols { get; }
        private readonly double[,] _data;

        public Matrix(int rows, int cols)
        {
            Rows = rows;
            Cols = cols;
            _data = new double[rows, cols];
        }

        public Matrix(double[,] data)
        {
            Rows = data.GetLength(0);
            Cols = data.GetLength(1);
            _data = (double[,])data.Clone();
        }

        public double this[int row, int col]
        {
            get => _data[row, col];
            set => _data[row, col] = value;
        }

        public static Matrix FromList(List<List<double>> list)
        {
            if (list == null || list.Count == 0 || list.Any(row => row.Count != list[0].Count))
                throw new ArgumentException("Invalid matrix dimensions.");

            int rows = list.Count;
            int cols = list[0].Count;
            var matrix = new Matrix(rows, cols);

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    matrix[i, j] = list[i][j];
                }
            }

            return matrix;
        }

        public List<List<double>> ToList()
        {
            var result = new List<List<double>>();
            for (int i = 0; i < Rows; i++)
            {
                var row = new List<double>();
                for (int j = 0; j < Cols; j++)
                {
                    row.Add(_data[i, j]);
                }
                result.Add(row);
            }
            return result;
        }

        public void SetData(double[,] newData)
        {
            if (newData.GetLength(0) != Rows || newData.GetLength(1) != Cols)
                throw new ArgumentException("New data dimensions must match the matrix size.");

            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Cols; j++)
                {
                    _data[i, j] = newData[i, j];
                }
            }
        }

        public void SetData(List<List<double>> newData)
        {
            if (newData.Count != Rows || newData.Any(row => row.Count != Cols))
                throw new ArgumentException("New data dimensions must match the matrix size.");

            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Cols; j++)
                {
                    _data[i, j] = newData[i][j];
                }
            }
        }

        public int GetLength(int dimension)
        {
            return dimension switch
            {
                0 => Rows,  
                1 => Cols, 
                _ => throw new ArgumentException("Invalid dimension. Use 0 for rows, 1 for columns.")
            };
        }

        public void SetRow(int rowIndex, double[] rowData)
        {
            if (rowIndex < 0 || rowIndex >= Rows || rowData.Length != Cols)
                throw new ArgumentException("Invalid row index or data size.");

            for (int j = 0; j < Cols; j++)
            {
                _data[rowIndex, j] = rowData[j];
            }
        }

        public void SetColumn(int colIndex, double[] colData)
        {
            if (colIndex < 0 || colIndex >= Cols || colData.Length != Rows)
                throw new ArgumentException("Invalid column index or data size.");

            for (int i = 0; i < Rows; i++)
            {
                _data[i, colIndex] = colData[i];
            }
        }

        public override string ToString()
        {
            return string.Join("\n", ToList().Select(row => string.Join(", ", row)));
        }
    }

}
