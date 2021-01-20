namespace Net.Models
{
    public class Log
    {
        public Log()
        {
            exception = new LogException();
            info = new object();
        }
        public string message { get; set; }
        public string type { get; set; }
        public LogException exception { get; set; }
        public object info { get; set; }
    }
    public class LogException
    {
        public int code { get; set; }
        public string message { get; set; }
        public string stack { get; set; }
    }

}