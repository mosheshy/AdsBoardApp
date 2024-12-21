using Microsoft.AspNetCore.Mvc;
using AdsBoardApp.Server.Models;
using AdsBoardApp.Server.BLL;

namespace AdsBoardApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdsController : ControllerBase
    {
        private readonly IAdsLogic _adsLogic;
        public AdsController(IAdsLogic adsLogic)
        {
            _adsLogic = adsLogic;
        }

        [HttpGet]
        [Route("Get")]
        public IActionResult Get()
        {
            try
            {
                var ads = _adsLogic.GetAllAds();
                return Ok(ads);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpGet]
        [Route("Get/{id}")]
        public IActionResult Get(int id)
        {
           try
            {
                var ad = _adsLogic.GetAd(id);
                return Ok(ad);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Post")]
        public IActionResult Post([FromBody] Ad ad)
        {
            try
            {
                _adsLogic.SaveAd(ad);
                return Ok(ad);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpPut]
        [Route("Put/{id}")]
        public IActionResult Put(int id, [FromBody] Ad ad)
        {
            try
            {
                _adsLogic.UpdateAd(id, ad);
                return Ok( id);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public IActionResult Delete(int id)
        {
           try
            {
                _adsLogic.DeleteAd(id);
                return Ok($"Ad deleted with id: {id}");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

      
    }
}
