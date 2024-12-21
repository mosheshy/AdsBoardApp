using AdsBoardApp.Server.Models;
using System.Text.Json;

namespace AdsBoardApp.Server.DAL
{
    public class JsonFileAds : IJsonFileAds
    {
        private readonly string _filePath = "ads.json";
        public List<Ad> LoadAds()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return new List<Ad>();
            }

            var json = System.IO.File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Ad>>(json);
        }

        public void SaveAds(List<Ad> ads)
        {
            var json = JsonSerializer.Serialize(ads);
            System.IO.File.WriteAllText(_filePath, json);
        }
    }
}
