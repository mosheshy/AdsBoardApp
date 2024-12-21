namespace AdsBoardApp.Server.Models
{

    public class Ad
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Price { get; set; }
        public string? Category { get; set; }
        public Location? Location { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedAt { get; set; }
    }

    public class Location
    {
        public Decimal Lat { get; set; } 
        public Decimal Lng { get; set; }
    }
}