using AdsBoardApp.Server.BLL;
using AdsBoardApp.Server.DAL;
using AdsBoardApp.Server.Models;
using Moq;
using Xunit;
using Xunit;
using System.Collections.Generic;
using System.Linq;
namespace TestAdsBoardApp
{
    public class UnitTestAdsLogic
    {

   
    
            private readonly Mock<IJsonFileAds> _mockJsonFileAds;
            private readonly AdsLogic _adsLogic;

            public UnitTestAdsLogic()
            {
                _mockJsonFileAds = new Mock<IJsonFileAds>();
                _adsLogic = new AdsLogic(_mockJsonFileAds.Object);
            }

            [Fact]
            public void GetAllAds_ReturnsAllAds()
            {
                // Arrange
                var ads = new List<Ad> { new Ad { Id = 1, Title = "Ad1" }, new Ad { Id = 2, Title = "Ad2" } };
                _mockJsonFileAds.Setup(m => m.LoadAds()).Returns(ads);

                // Act
                var result = _adsLogic.GetAllAds();

                // Assert
                Assert.Equal(ads.Count, result.Count);
                Assert.Equal(ads, result);
            }

            [Fact]
            public void GetAd_ReturnsAdById()
            {
                // Arrange
                var ads = new List<Ad> { new Ad { Id = 1, Title = "Ad1" }, new Ad { Id = 2, Title = "Ad2" } };
                _mockJsonFileAds.Setup(m => m.LoadAds()).Returns(ads);

                // Act
                var result = _adsLogic.GetAd(1);

                // Assert
                Assert.Equal(ads[0], result);
            }

            [Fact]
            public void SaveAd_AddsNewAd()
            {
                // Arrange
                var ads = new List<Ad> { new Ad { Id = 1, Title = "Ad1" } };
                _mockJsonFileAds.Setup(m => m.LoadAds()).Returns(ads);
                var newAd = new Ad { Title = "Ad2" };

                // Act
                _adsLogic.SaveAd(newAd);

                // Assert
                _mockJsonFileAds.Verify(m => m.SaveAds(It.Is<List<Ad>>(a => a.Count == 2 && a.Any(ad => ad.Title == "Ad2"))), Times.Once);
            }

            [Fact]
            public void UpdateAd_UpdatesExistingAd()
            {
                // Arrange
                var ads = new List<Ad> { new Ad { Id = 1, Title = "Ad1" } };
                _mockJsonFileAds.Setup(m => m.LoadAds()).Returns(ads);
                var updatedAd = new Ad { Title = "UpdatedAd1" };

                // Act
                _adsLogic.UpdateAd(1, updatedAd);

                // Assert
                _mockJsonFileAds.Verify(m => m.SaveAds(It.Is<List<Ad>>(a => a.Any(ad => ad.Title == "UpdatedAd1"))), Times.Once);
            }

            [Fact]
            public void DeleteAd_RemovesAd()
            {
                // Arrange
                var ads = new List<Ad> { new Ad { Id = 1, Title = "Ad1" } };
                _mockJsonFileAds.Setup(m => m.LoadAds()).Returns(ads);

                // Act
                _adsLogic.DeleteAd(1);

                // Assert
                _mockJsonFileAds.Verify(m => m.SaveAds(It.Is<List<Ad>>(a => a.Count == 0)), Times.Once);
            }
        }
    }

