namespace MvcAngularClient.ViewModels
{
    public class AccessToken
    {
        public AccessToken(string token)
        {
            Token = token;
        }
        public string Token { get; set; }
    }
}