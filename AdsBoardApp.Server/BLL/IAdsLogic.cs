using AdsBoardApp.Server.Models;

namespace AdsBoardApp.Server.BLL
{
    public interface IAdsLogic
    {
        void DeleteAd(int id);
        Ad GetAd(int id);
        List<Ad> GetAllAds();
        void SaveAd(Ad ad);
        void UpdateAd(int id, Ad ad);
    }
}