# LexiQuest - Full-Stack Wordle Game Project Overview

**Course:** CSCD379 - Web Development (Spring 2024)  
**Institution:** Eastern Washington University  
**Project URL:** https://lively-sea-0f3b4921e.5.azurestaticapps.net  
**API URL:** https://lexiquestapi.azurewebsites.net/

---

## Executive Summary

LexiQuest is a feature-rich, full-stack web application based on the popular Wordle game. This project was developed as part of a comprehensive web development course at Eastern Washington University, involving multiple progressive assignments that built upon each other to create a complete, production-ready application with authentication, authorization, database integration, and cloud deployment.

---

## Project Architecture

### Frontend Stack
- **Framework:** Nuxt 3 (Vue 3 framework with server-side rendering capabilities)
- **UI Library:** Vuetify 3 (Material Design component framework)
- **Language:** TypeScript
- **State Management:** Vue Composition API with reactive state
- **HTTP Client:** Axios for API communication
- **Testing:** Vitest with Vue Test Utils
- **Build Tool:** Vite

### Backend Stack
- **Framework:** ASP.NET Core Web API
- **Language:** C#
- **ORM:** Entity Framework Core
- **Database:** SQL Server
- **Authentication:** ASP.NET Core Identity with JWT (JSON Web Tokens)
- **Authorization:** Policy-based authorization with custom claims
- **Testing:** xUnit for unit testing
- **API Documentation:** Swagger/OpenAPI

### Infrastructure & DevOps
- **Frontend Hosting:** Azure Static Web Apps
- **Backend Hosting:** Azure App Service
- **Database:** Azure SQL Database
- **CI/CD:** GitHub Actions with automated deployment pipelines
- **Version Control:** Git with GitHub

---

## Key Features Implemented

### 1. Core Wordle Game Mechanics
- **Random Word Mode:** Players can play unlimited random word games
- **Daily Challenge Mode:** All players receive the same word each day
- **6-Attempt Limit:** Traditional Wordle gameplay with 6 guesses
- **Color-Coded Feedback:**
  - Green: Correct letter in correct position
  - Yellow: Correct letter in wrong position
  - Gray: Letter not in word
- **Interactive Keyboard:** Visual keyboard with color-coded feedback
- **Game State Management:** Win/loss detection and game restart functionality

### 2. Responsive Design
Fully responsive interface supporting multiple device sizes:
- 1080p Desktop displays
- iPad Air (tablet)
- Samsung Galaxy S20 Ultra (large phone)
- iPhone SE (small phone)

### 3. Daily Word Statistics & History
- **Daily Words History Page:** View last 10 daily words with statistics
- **Statistics Tracked:**
  - Number of plays per day
  - Average score (attempts to win)
  - Average completion time
- **Play Indicators:** Shows which daily challenges the user has completed
- **Historical Play:** Ability to play past daily challenges

### 4. User Authentication & Authorization
- **ASP.NET Core Identity:** Secure user management
- **JWT Token-Based Auth:** Stateless authentication using bearer tokens
- **Login System:** User sign-in functionality
- **Password Requirements:** Configurable password policies
- **Persistent Sessions:** Token-based session management

### 5. Policy-Based Authorization
- **Role-Based Access Control (RBAC):** Different permission levels
- **Custom Claims:** "MasterOfTheUniverse" claim for elevated privileges
- **Age-Based Restrictions:** Users must be over 21 for certain features
- **Authorization Policies:**
  - Anyone can view word lists
  - Logged-in users can modify common word flags
  - Only authorized users (21+, special claim) can add/delete words

### 6. Word Editor (CRUD Interface)
- **View All Words:** Paginated list (10-100 words per page)
- **Search Functionality:** Real-time search as you type (starts-with filter)
- **Add Words:** Create new words (with validation)
- **Delete Words:** Remove words from the database
- **Edit Common Flag:** Toggle whether a word is commonly used
- **Duplicate Prevention:** System prevents duplicate word entries
- **Alphabetical Sorting:** Words displayed in alphabetical order

### 7. Leaderboard System
- **Player Statistics:** Track player performance
- **Global Leaderboard:** Compare scores across all players
- **Game History:** Individual player game records

### 8. Enhanced User Experience
- **Custom Theme:** Attractive medieval/fantasy themed design
- **Instructions Page:** Comprehensive how-to-play guide
- **Hamburger Menu Navigation:** Mobile-friendly navigation
- **Sound Effects:** Optional audio feedback
- **Loading States:** Progress indicators for async operations
- **Error Handling:** User-friendly error messages

---

## Technical Skills Demonstrated

### Frontend Development
1. **Modern JavaScript Framework (Vue 3)**
   - Component-based architecture
   - Composition API and reactive programming
   - Single Page Application (SPA) development
   - Client-side routing with Vue Router

2. **TypeScript**
   - Type-safe development
   - Interface definitions
   - Generic programming
   - Better IDE support and code quality

3. **State Management**
   - Reactive data with Vue's reactivity system
   - Component communication (props, events, v-model)
   - Application-wide state management
   - Local storage integration

4. **Responsive Design**
   - Mobile-first design principles
   - CSS Grid and Flexbox
   - Vuetify's responsive breakpoint system
   - Testing on multiple device sizes

5. **API Integration**
   - RESTful API consumption
   - Async/await patterns
   - Error handling and loading states
   - JWT token management in requests

6. **Testing**
   - Unit testing with Vitest
   - Component testing with Vue Test Utils
   - Test-driven development practices

### Backend Development
1. **ASP.NET Core Web API**
   - RESTful API design principles
   - Controller and service layer architecture
   - Dependency injection
   - Middleware pipeline
   - CORS configuration

2. **Entity Framework Core**
   - Code-first database approach
   - Complex entity relationships (one-to-many, many-to-many)
   - LINQ queries for data manipulation
   - Database migrations
   - Seeding initial data

3. **Authentication & Security**
   - ASP.NET Core Identity implementation
   - JWT token generation and validation
   - Password hashing and security
   - Claims-based authorization
   - Policy-based access control

4. **Database Design**
   - Relational database schema design
   - Entity relationships and foreign keys
   - Data normalization
   - Indexing strategies

5. **Testing**
   - Unit testing with xUnit
   - Mocking with test doubles
   - Test fixtures and setup

### DevOps & Cloud Services
1. **Azure Cloud Platform**
   - Azure Static Web Apps deployment
   - Azure App Service for API hosting
   - Azure SQL Database setup and management
   - Connection strings and configuration management

2. **CI/CD Pipelines**
   - GitHub Actions workflow configuration
   - Automated build and test execution
   - Automated deployment to Azure
   - Environment-specific configurations

3. **Version Control**
   - Git branching strategies
   - Pull request workflow
   - Code review practices
   - Merge conflict resolution

### Software Engineering Practices
1. **Architectural Patterns**
   - Model-View-Controller (MVC)
   - Service layer pattern
   - Repository pattern (through EF Core)
   - Dependency injection

2. **API Design**
   - RESTful conventions
   - HTTP status codes
   - API versioning considerations
   - Swagger/OpenAPI documentation

3. **Security Best Practices**
   - Input validation
   - SQL injection prevention (EF parameterization)
   - XSS prevention
   - HTTPS enforcement
   - Secure credential management

4. **Code Quality**
   - Clean code principles
   - SOLID principles
   - Code reviews
   - Consistent formatting and style

---

## Assignment Progression

The project was built through 5 progressive assignments plus a final project:

### Assignment 1-2: Foundation
- Set up frontend with Nuxt and Vuetify
- Implement basic Wordle game mechanics
- Create initial deployment pipeline
- Build core UI components

### Assignment 3: Enhanced Features
- Add player system
- Implement leaderboard
- Improve game state management

### Assignment 4: Responsive Design & Daily Words
- Make all pages responsive for multiple devices
- Create improved landing page and theme
- Add instructions page
- Implement daily word of the day feature
- Build daily words history page with statistics

### Assignment 5: Authentication & Authorization
- Implement ASP.NET Core Identity
- Add JWT authentication
- Create login system
- Build word editor with CRUD operations
- Implement policy-based authorization
- Add search functionality

### Final Project Options
The course culminated in a final project where students could either:
- Continue enhancing the Wordle application
- Build a new full-stack application with similar technical requirements

---

## Learning Outcomes

### 1. Full-Stack Development
- **End-to-End Understanding:** Gained comprehensive knowledge of how frontend, backend, and database layers interact in a modern web application
- **API-First Design:** Learned to design and implement RESTful APIs that serve multiple clients
- **Data Flow:** Understood complete data flow from user interaction through UI, API calls, business logic, and database operations

### 2. Modern Web Development Frameworks
- **Vue 3 Ecosystem:** Mastered Vue 3's Composition API, reactive programming, and component lifecycle
- **Nuxt Framework:** Learned server-side rendering concepts, routing, and Nuxt-specific optimizations
- **ASP.NET Core:** Gained expertise in building scalable, performant web APIs with .NET

### 3. Security & Authentication
- **Identity Management:** Implemented secure user authentication and session management
- **Authorization Patterns:** Learned policy-based and claims-based authorization
- **Token-Based Auth:** Understood JWT architecture and stateless authentication
- **Security Best Practices:** Applied OWASP security principles in real-world scenarios

### 4. Database Management
- **Relational Database Design:** Created normalized database schemas with proper relationships
- **ORM Usage:** Leveraged Entity Framework Core for type-safe database operations
- **Migrations:** Managed database schema changes through code-first migrations
- **Query Optimization:** Wrote efficient LINQ queries and understood database indexing

### 5. Cloud & DevOps
- **Azure Services:** Deployed and managed applications on Azure cloud platform
- **CI/CD Pipelines:** Built automated deployment pipelines with GitHub Actions
- **Infrastructure as Code:** Configured infrastructure through YAML and configuration files
- **Production Deployment:** Managed real production environments with monitoring and logging

### 6. UI/UX Design
- **Responsive Design:** Created interfaces that work seamlessly across all device sizes
- **Material Design:** Applied Google's Material Design principles using Vuetify
- **User Experience:** Designed intuitive interfaces with proper feedback and error handling
- **Accessibility:** Considered accessibility in component design

### 7. Testing & Quality Assurance
- **Unit Testing:** Wrote comprehensive unit tests for both frontend and backend
- **Test-Driven Development:** Practiced TDD principles in feature development
- **Code Coverage:** Maintained test coverage for critical functionality
- **Integration Testing:** Tested API endpoints and database interactions

### 8. Software Development Process
- **Agile Methodology:** Worked through iterative assignment cycles with regular feedback
- **Code Reviews:** Participated in peer code reviews to improve code quality
- **Git Workflow:** Used professional Git branching and pull request workflows
- **Documentation:** Created and maintained project documentation

### 9. Problem Solving & Debugging
- **Browser DevTools:** Mastered Chrome DevTools for frontend debugging
- **API Testing:** Used Swagger and HTTP clients for API testing
- **Error Handling:** Implemented comprehensive error handling and logging
- **Performance Optimization:** Identified and resolved performance bottlenecks

### 10. Professional Development
- **Technical Communication:** Documented code and architectural decisions
- **Collaboration:** Worked with version control and team-based workflows
- **Self-Directed Learning:** Researched and applied new technologies independently
- **Best Practices:** Adopted industry-standard coding conventions and patterns

---

## What You Accomplished

Throughout this course, you built a production-ready, full-stack web application from scratch. Here are your key achievements:

### Technical Achievements
1. **Built a Complete SPA:** Created a fully functional Single Page Application with modern JavaScript frameworks
2. **Implemented RESTful API:** Designed and built a comprehensive backend API with multiple endpoints
3. **Database Design & Implementation:** Created a relational database schema and implemented it using Entity Framework
4. **Authentication System:** Built a secure authentication and authorization system from scratch
5. **Cloud Deployment:** Successfully deployed both frontend and backend to Azure cloud services
6. **CI/CD Pipeline:** Configured automated build and deployment pipelines
7. **Responsive Design:** Made the application work seamlessly on mobile, tablet, and desktop
8. **CRUD Operations:** Implemented complete Create, Read, Update, Delete functionality
9. **Real-Time Features:** Added search-as-you-type functionality
10. **Testing Suite:** Wrote unit tests for both frontend and backend components

### Problem-Solving Examples
- **Challenge:** Implementing daily word synchronization across all users
  - **Solution:** Created a WordOfTheDay service that generates consistent words based on dates
  
- **Challenge:** Securing API endpoints while allowing public access to some features
  - **Solution:** Implemented policy-based authorization with different permission levels

- **Challenge:** Managing game state across components
  - **Solution:** Used Vue's reactive state management with proper component communication

- **Challenge:** Responsive design across vastly different screen sizes
  - **Solution:** Leveraged Vuetify's breakpoint system and CSS Grid for flexible layouts

### Soft Skills Developed
- **Time Management:** Completed multiple assignments with overlapping deadlines
- **Code Review Skills:** Provided constructive feedback on peer code
- **Technical Writing:** Documented features and architectural decisions
- **Attention to Detail:** Ensured code quality and followed best practices
- **Continuous Learning:** Self-taught new technologies and frameworks as needed

---

## Interview Talking Points

### 1. Project Overview (30-second pitch)
"I built LexiQuest, a full-stack Wordle game, using Vue 3/Nuxt for the frontend and ASP.NET Core for the backend. The application features user authentication with JWT tokens, policy-based authorization, responsive design, and is deployed on Azure with automated CI/CD pipelines. It includes features like daily challenges, player statistics, and a word editor with CRUD operations."

### 2. Technical Highlights to Discuss
- **Full-Stack Ownership:** "I was responsible for both frontend and backend development, which gave me a complete understanding of how modern web applications work end-to-end."
- **Security Implementation:** "I implemented JWT-based authentication and policy-based authorization, including custom claims and age restrictions."
- **Cloud Deployment:** "I deployed the application to Azure using Static Web Apps for the frontend and App Service for the API, with automated deployments through GitHub Actions."
- **Database Design:** "I designed and implemented a relational database with Entity Framework, including complex relationships and migrations."

### 3. Challenges & Solutions Stories
Prepare to discuss specific challenges you faced and how you solved them. For example:
- "When implementing the daily word feature, I had to ensure all users got the same word regardless of timezone..."
- "For the word editor, I needed to implement real-time search while maintaining good performance..."
- "When working with responsive design, I had to balance desktop and mobile user experiences..."

### 4. Technologies You Can Discuss
Be prepared to dive deep into:
- Vue 3 Composition API and reactive programming
- ASP.NET Core middleware and dependency injection
- Entity Framework Core and LINQ queries
- JWT authentication flow
- Azure cloud services and deployment
- Git workflow and CI/CD pipelines

### 5. Best Practices You Applied
- "I followed the single responsibility principle by separating business logic into service classes"
- "I used dependency injection throughout the backend for testability and maintainability"
- "I implemented comprehensive error handling with user-friendly messages"
- "I wrote unit tests to ensure code quality and prevent regressions"

### 6. What You Learned
- "This project taught me how to design and implement a complete application from database to UI"
- "I learned the importance of security in web applications, especially authentication and authorization"
- "I gained experience with cloud deployment and DevOps practices"
- "I developed skills in responsive design and creating great user experiences"

### 7. Future Improvements
Shows you think beyond the assignment:
- "I would add real-time multiplayer features using SignalR"
- "I'd implement more sophisticated statistics and data visualization"
- "I'd add social features like sharing results and friend leaderboards"
- "I'd optimize database queries with caching for better performance"

---

## Code Examples to Highlight

### 1. JWT Authentication Implementation
```csharp
// Custom JWT configuration with policy-based authorization
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        // ... configuration
    };
});
```

### 2. Vue Component with TypeScript
```typescript
// Reactive state management in Vue 3
const game = reactive({
    secretWord: '',
    guesses: [],
    gameState: GameState.Playing
});
```

### 3. Entity Framework Relationships
```csharp
public class Game {
    public int GameId { get; set; }
    public int WordId { get; set; }
    public Word Word { get; set; } = null!;
    // Navigation properties demonstrating ORM relationships
}
```

---

## Project Metrics

- **Total Components:** 9+ Vue components
- **API Endpoints:** 10+ RESTful endpoints
- **Database Tables:** 6+ entities with relationships
- **Lines of Code:** 2000+ lines (estimated across frontend and backend)
- **Deployment Pipelines:** 2 (frontend and backend)
- **Device Breakpoints:** 4 responsive sizes
- **Test Coverage:** Unit tests for core functionality

---

## Conclusion

This project demonstrates comprehensive full-stack web development skills, from database design through backend API development to frontend implementation and cloud deployment. It showcases proficiency in modern web technologies, security best practices, responsive design, and professional software development workflows.

The progressive nature of the assignments shows continuous learning and building upon previous knowledge, while the final production deployment demonstrates the ability to deliver real-world, user-facing applications.

**Key Takeaway for Interviews:** "This project gave me hands-on experience with the entire web development stack and taught me how to build secure, scalable, and maintainable web applications using industry-standard technologies and practices."

---

## Additional Resources

- **Live Application:** https://lively-sea-0f3b4921e.5.azurestaticapps.net
- **API Documentation:** https://lexiquestapi.azurewebsites.net/swagger
- **GitHub Repository:** https://github.com/Hex-Paladin/EWU-CSCD379-2024-Spring
- **Course Materials:** Eastern Washington University CSCD379 (Spring 2024)
