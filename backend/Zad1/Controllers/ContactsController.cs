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

        // Initializing MongoDB connection where the database is named "NetPC" 
        // and the collection has name "Zad1"
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
            // Check if email already exists
            var existingContact = _contactRepository.GetUserByEmail(contact.Email);
            if(existingContact != null)
            {
                return BadRequest("Email address already exists.");
            }
            
            //Added hashing passwords for security reasons 
            contact.Password = BCrypt.Net.BCrypt.HashPassword(contact.Password);
            
            try
            {
                await _contactRepository.AddContact<Contact>(contact);
                return Ok("Added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to insert contact. Error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] Contact contact)
        {
            var existingContact = _contactRepository.GetUserByEmail(contact.Email);
            // Check if email already exists:
            // 1) We want to check if there is already a record with given email
            // 2) Then we also want to check if the existing email is assigned to current contact by checking their ids
            if(existingContact != null && existingContact.Id != contact.Id)
            {
                return BadRequest("Email address already exists.");
            }

            // If password is changed then it needs to be hashed
            if (existingContact.Password != contact.Password)
            {
                contact.Password = BCrypt.Net.BCrypt.HashPassword(contact.Password);
            }
            
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

                // Admin feature to allow browsing all functionalities even when contact list is null
                if (request is {Email: "admin", Password: "admin"})
                {
                    return Ok(new { message = "Logged as admin" });
                }
                
                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                {
                    return Unauthorized();
                }

                return Ok(new { message = "Logged in successfully" });
            }
            catch (Exception exception)
            {
                return BadRequest($"Error: {exception.Message}");
            }
        }
    }
}