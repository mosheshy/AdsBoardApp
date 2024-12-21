using AdsBoardApp.Server.BLL;
using AdsBoardApp.Server.DAL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IJsonFileAds, JsonFileAds>();
builder.Services.AddTransient<IAdsLogic, AdsLogic>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Allow any domain (for development only)
              .AllowAnyMethod() // Allow any HTTP method
              .AllowAnyHeader(); // Allow any headers
    });
});

var app = builder.Build();

app.UseCors("AllowAll");


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
