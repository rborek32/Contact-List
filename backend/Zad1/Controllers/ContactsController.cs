using Microsoft.AspNetCore.Mvc;
using Zad1.Models;
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
        public IActionResult GetAllContacts()
        {
            var contacts = _contactRepository.GetAllContacts();
            return Ok(contacts);
        }
        
        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            //Added hashing passwords for security reasons 
            contact.Password = BCrypt.Net.BCrypt.HashPassword(contact.Password);
            
            try
            {
                await _contactRepository.AddContact<Contact>(contact);
                return Ok("Added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to insert movie. Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] Contact contact)
        {
            await _contactRepository.UpdateContact<Contact>(contact);
            return Ok("Updated Successfully");
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteContact([FromQuery] string email)
        {
            var contact = _contactRepository.GetUserByEmail(email);
            
            await _contactRepository.DeleteContact<Contact>(contact);
            return Ok("Deleted Successfully");
        }
        
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {

            try
            {
                var user = _contactRepository.GetUserByEmail(request.Email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                {
                    return Unauthorized();
                }

                return Ok(new { message = "Logged in successfully" });
            }
            catch (Exception exception)
            {
                return BadRequest($"Login: {request.Email}, Password {request.Password}" +
                                  $"Error: {exception.Message}");
            }
        }
    }
}
