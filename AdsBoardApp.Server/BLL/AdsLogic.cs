using AdsBoardApp.Server.DAL;
using AdsBoardApp.Server.Models;
using System.Text.Json;

namespace AdsBoardApp.Server.BLL
{
    //implement tests ?
    public class AdsLogic : IAdsLogic
    {
        private readonly IJsonFileAds _jsonFileAds;
        public AdsLogic(IJsonFileAds jsonFileAds)
        {
            _jsonFileAds = jsonFileAds;
        }

        public List<Ad> GetAllAds()
        {
            return _jsonFileAds.LoadAds();
        }
        public Ad GetAd(int id)
        {
            return _jsonFileAds.LoadAds().FirstOrDefault(e => e.Id == id);
        }

        public void SaveAd(Ad ad)
        {
            var ads = _jsonFileAds.LoadAds();
            ad.Id = ads.Any() ? ads.Max(a => a.Id ?? 0) + 1 : 1;
            ads.Add(ad);
            _jsonFileAds.SaveAds(ads);
        }
        public void UpdateAd(int id, Ad ad)
        {
            var ads = _jsonFileAds.LoadAds();
            var existingAd = ads.Where(e => e.Id == id).FirstOrDefault();
            if (existingAd != null)
            {
                existingAd.Title = ad.Title;
                existingAd.Description = ad.Description;
                existingAd.Price = ad.Price;
                existingAd.Category = ad.Category;
                existingAd.Location = ad.Location;
                existingAd.CreatedBy = ad.CreatedBy;
                existingAd.CreatedAt = ad.CreatedAt;
            }
            _jsonFileAds.SaveAds(ads);
        }
        public void DeleteAd(int id)
        {
            var ads = _jsonFileAds.LoadAds();
            var existingAd = ads.Where(e => e.Id == id).FirstOrDefault();
            if (existingAd != null)
            {
                ads.Remove(existingAd);
            }
            _jsonFileAds.SaveAds(ads);

        }

    }
}
