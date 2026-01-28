# LexiQuest - Quick Interview Reference Guide

## 🎯 30-Second Elevator Pitch

"I built LexiQuest, a full-stack Wordle game using Vue 3/Nuxt on the frontend and ASP.NET Core on the backend. The app features JWT authentication, policy-based authorization, responsive design across all devices, and is deployed on Azure with CI/CD pipelines. Key features include daily challenges, leaderboards, player statistics, and an admin word editor with real-time search."

## 🛠️ Tech Stack (Quick Reference)

**Frontend:**
- Vue 3 / Nuxt 3 / TypeScript
- Vuetify (Material Design)
- Axios / Vitest

**Backend:**
- ASP.NET Core Web API / C#
- Entity Framework Core
- SQL Server
- ASP.NET Core Identity + JWT

**DevOps:**
- Azure Static Web Apps
- Azure App Service
- GitHub Actions CI/CD

## ⭐ Key Features You Built

1. ✅ **Core Game Mechanics** - Full Wordle gameplay with 6 attempts, color-coded feedback
2. ✅ **Daily Challenges** - Everyone gets the same word each day
3. ✅ **Authentication** - JWT-based secure login system
4. ✅ **Authorization** - Policy-based with custom claims (age 21+, special privileges)
5. ✅ **Word Editor** - CRUD interface with real-time search, pagination
6. ✅ **Leaderboards** - Player rankings and statistics
7. ✅ **History** - View past daily challenges with stats
8. ✅ **Responsive Design** - Works on desktop, tablet, and mobile
9. ✅ **Cloud Deployment** - Fully automated Azure deployment

## 💡 Top 5 Technical Achievements

### 1. **Full-Stack Architecture**
Built complete separation of concerns: Vue SPA → REST API → SQL Database
- RESTful API design with proper HTTP verbs and status codes
- Service layer pattern for business logic
- Entity Framework for data access

### 2. **Security Implementation**
```csharp
// Custom JWT + Policy-based Authorization
[Authorize(Policy = "MasterOfTheUniverse")]
public async Task<IActionResult> DeleteWord(int id) { }
```
- JWT token generation and validation
- Custom authorization policies
- Age-based restrictions from claims
- Secure password hashing with Identity

### 3. **Responsive Design**
- Tested on 4 device sizes (desktop, iPad, Galaxy S20, iPhone SE)
- Vuetify's breakpoint system
- Mobile-first approach

### 4. **CI/CD Pipeline**
- GitHub Actions workflows
- Automated testing on every commit
- Zero-downtime deployments to Azure

### 5. **Database Design**
- 6+ entities with proper relationships
- Code-first migrations
- Data seeding for initial setup
- LINQ queries for efficient data retrieval

## 🎤 Interview Questions You Can Answer

### "Tell me about a challenging problem you solved"

**Challenge:** Implementing daily word synchronization across all users in different timezones

**Solution:** 
```csharp
public async Task<string> GetWordOfTheDay(DateOnly date) {
    var wordOfDay = await _db.WordsOfTheDay
        .Include(w => w.Word)
        .FirstOrDefaultAsync(w => w.Date == date);
    
    if (wordOfDay == null) {
        // Generate new daily word if not exists
        var randomWord = await GetRandomWord();
        wordOfDay = new WordOfTheDay { 
            Date = date, 
            WordId = randomWord.WordId 
        };
        _db.WordsOfTheDay.Add(wordOfDay);
        await _db.SaveChangesAsync();
    }
    
    return wordOfDay.Word.Text;
}
```

**Impact:** All users now get the same word regardless of when they play, creating a shared daily experience

---

### "How did you handle security?"

**Multi-layered approach:**
1. **Authentication:** JWT tokens with secure secret keys
2. **Authorization:** Custom policies with claims-based access
3. **Password Security:** ASP.NET Identity with hashing
4. **Input Validation:** Prevent SQL injection via EF parameterization
5. **HTTPS:** Enforced in production
6. **CORS:** Configured to allow only specific origins

**Real example:**
```csharp
// Only users 21+ with special claim can delete words
[Authorize(Policy = Authorize.MasterOfTheUniverse)]
public async Task<IActionResult> DeleteWord(int id)

// Policy definition with age requirement
policy.RequireClaim("MasterOfTheUniverse")
      .RequireAssertion(context => {
          var user = context.User;
          var birthdate = user.FindFirst("birthdate")?.Value;
          // Check age is 21+
      });
```

---

### "Describe your development process"

1. **Plan:** Review assignment requirements, design approach
2. **Implement:** Build feature with clean code practices
3. **Test:** Write unit tests (Vitest/xUnit), manual testing
4. **Deploy:** Push to GitHub, CI/CD runs automatically
5. **Review:** Peer code reviews, address feedback
6. **Iterate:** Refine based on testing and feedback

**Tools used:**
- Git branching for feature development
- Pull requests for code review
- GitHub Actions for CI/CD
- Azure for production hosting

---

### "What would you improve?"

**Performance:**
- Add caching for word lists (Redis)
- Implement database query optimization
- Add pagination server-side

**Features:**
- Real-time multiplayer using SignalR
- Social features (share results, friend challenges)
- Advanced statistics and data visualization
- Progressive Web App (PWA) for offline play

**Technical Debt:**
- Increase test coverage to 80%+
- Add integration tests for API
- Implement comprehensive error logging
- Add performance monitoring

---

## 📊 Metrics to Mention

- **Architecture:** 3-tier (UI → API → Database)
- **Components:** 9+ reusable Vue components
- **API Endpoints:** 10+ RESTful endpoints
- **Database Tables:** 6+ entities with relationships
- **Responsive Breakpoints:** 4 device sizes
- **Cloud Services:** 3 Azure services (Static Web Apps, App Service, SQL)
- **Deployment:** Automated CI/CD with 0 downtime
- **Security:** JWT + Policy-based authorization

## 🎓 Skills You Can Demonstrate

**Frontend:**
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ Component architecture
- ✅ Responsive design
- ✅ State management
- ✅ API integration
- ✅ Testing (Vitest)

**Backend:**
- ✅ ASP.NET Core Web API
- ✅ C# / .NET
- ✅ Entity Framework Core
- ✅ RESTful API design
- ✅ Authentication & Authorization
- ✅ Database design
- ✅ Unit testing (xUnit)

**DevOps:**
- ✅ Azure cloud services
- ✅ CI/CD pipelines
- ✅ Git workflow
- ✅ Infrastructure as code

**Soft Skills:**
- ✅ Problem solving
- ✅ Code review
- ✅ Technical documentation
- ✅ Time management
- ✅ Continuous learning

## 🔍 Deep Dive Topics

Be prepared to discuss these in detail:

### Vue 3 Reactivity
```typescript
// How Vue 3's reactive system works
const game = reactive({
    secretWord: '',
    guesses: [],
    gameState: GameState.Playing
});

// Any change to 'game' automatically updates the UI
game.guesses.push(newGuess); // UI updates instantly
```

### Entity Framework Relationships
```csharp
public class Game {
    public int GameId { get; set; }
    public int WordId { get; set; }
    public Word Word { get; set; } = null!; // Navigation property
}

// EF handles joins automatically
var games = await _db.Games
    .Include(g => g.Word) // Eager loading
    .Where(g => g.IsWin)
    .ToListAsync();
```

### JWT Flow
1. User logs in with credentials
2. Server validates, generates JWT token
3. Client stores token (localStorage)
4. Client includes token in Authorization header
5. Server validates token on each request
6. Server extracts user info from token claims

### Azure Deployment Architecture
```
GitHub Push → GitHub Actions → Build & Test → Deploy to Azure
                                   ↓
                          Frontend: Static Web Apps
                          Backend: App Service
                          Database: Azure SQL
```

## 💼 Project URL Reference

**Live Site:** https://lively-sea-0f3b4921e.5.azurestaticapps.net  
**API Docs:** https://lexiquestapi.azurewebsites.net/swagger  
**Source Code:** https://github.com/Hex-Paladin/EWU-CSCD379-2024-Spring

---

## ✨ Closing Statement

"This project gave me hands-on experience building production-ready web applications with modern technologies. I learned not just how to code, but how to architect, secure, test, and deploy complete full-stack applications. I'm comfortable working across the entire stack and can contribute to any part of a web application from database design to user interface."

---

## 📝 Quick Tips for Interview

1. **Have the app open** to demo during interview
2. **Use specific examples** from your code
3. **Explain your thinking process**, not just what you built
4. **Be honest** about what you learned vs what you knew
5. **Show enthusiasm** for the technologies you used
6. **Mention challenges** and how you overcame them
7. **Connect features** to business value
8. **Ask questions** about their tech stack

## 🎯 Red Flags to Avoid

❌ "I just followed tutorials"  
✅ "I learned the fundamentals and applied them to solve specific problems"

❌ "It was easy"  
✅ "I faced challenges with X, and solved it by Y"

❌ "I know everything about Vue"  
✅ "I have solid Vue 3 experience and continue learning"

❌ Just listing technologies  
✅ Explaining how you used them and why

---

**Remember:** You built a real, production application. Be confident in your accomplishments!
