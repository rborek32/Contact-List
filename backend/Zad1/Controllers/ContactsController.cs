using Microsoft.AspNetCore.Mvc;
using Zad1.Repositories;

namespace Zad1.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController :ControllerBase
    {
        private readonly ContactRepository _contactRepository;

        public ContactsController(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("MongoDB");
            _contactRepository = new ContactRepository(connectionString, "NetPC", "Zad1");
        }
        
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var contacts = _contactRepository.GetAllContacts();
            return Ok(contacts);
        }
    }
}
