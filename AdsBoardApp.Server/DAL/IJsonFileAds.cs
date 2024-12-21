using AdsBoardApp.Server.Models;

namespace AdsBoardApp.Server.DAL
{
    public interface IJsonFileAds
    {
        List<Ad> LoadAds();
        void SaveAds(List<Ad> ads);
    }
}