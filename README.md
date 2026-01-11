# NIMCET Prep Tracker

A comprehensive, feature-rich web application for NIMCET (NIT MCA Common Entrance Test) exam preparation. Built as a single-file HTML application with offline-first capabilities using LocalStorage.

## 🚀 Features

### 📊 Dashboard
- Real-time progress tracking with stat cards
- Phase-wise progress visualization (4 phases)
- Score prediction chart
- Topic accuracy breakdown with color-coded performance
- Recent mistakes overview
- Quick action buttons for navigation

### ❓ Question Solving Interface
- **Smart Setup**: Choose paper, section, topic, question count
- **Timer**: Configurable timer per question with visual alerts
- **Real-time Stats**: Track accuracy, streak, average time
- **Auto-advance**: Optional auto-advance after answering
- **Explanations**: Detailed explanations for each question
- **Session Management**: Save and resume sessions
- Sample question bank with 10+ pre-loaded questions

### 📋 Mock Tests
- **Previous Year Papers**: Solve original NIMCET papers (2019-2024)
- **Custom Tests**: Mix papers, topics, and difficulty levels
- **Weakness-Based Tests**: Auto-generated based on your weak areas
- Mock test history and performance tracking

### 📝 Mistake Notebook
- Auto-save mistakes during practice
- Spaced repetition system
- Filter by review status (Not Reviewed, Reviewed, Mastered)
- Detailed mistake analysis with explanations
- Export mistakes as JSON

### 📊 Analytics
- **Score Trajectory**: Visual chart of progress over time
- **Topic Performance**: Detailed breakdown by topic
- **Daily Heatmap**: Activity tracking calendar
- **Section Breakdown**: Performance by Math, Reasoning, Computer, English

### 🗺️ Roadmap
- 4-phase accelerated preparation plan
- Phase 1: Foundation (6 weeks) - 720+ questions
- Phase 2: Drilling (6 weeks) - Target weaknesses
- Phase 3: Speed Building (3 weeks) - Timed practice
- Phase 4: Final Sprint (6 weeks) - Peak performance
- AI-powered recommendations based on your progress

### ⚙️ Settings
- Customize exam date and target score
- Set start date for progress tracking
- Personal profile management
- Data export/import capabilities
- Reset all data option

## 🎨 Design System

### Color Palette
- **Primary**: #1B4965 (Professional Dark Blue)
- **Secondary**: #2A8F9E (Teal Accent)
- **Accent**: #D4A574 (Warm Gold)
- **Success**: #2ECC71 (Green)
- **Warning**: #F39C12 (Orange)
- **Error**: #E74C3C (Red)

### UI Principles
- Professional, clean design
- Responsive layout (mobile, tablet, desktop)
- Touch-friendly interface
- Accessibility-focused (WCAG AA compliant)
- Smooth transitions and hover effects

## 💾 Data Storage

All data is stored locally in your browser using LocalStorage (JSON format):
- User profile and settings
- Questions solved with timestamps
- Mistakes notebook with review counts
- Mock test results
- Daily statistics
- Topic accuracy tracking

**Note**: Data persists across sessions but is browser-specific. Use the export feature to backup your data.

## 🚀 Getting Started

### Installation
1. Simply open `index.html` in any modern web browser
2. No installation, dependencies, or server required
3. Works completely offline

### First Steps
1. Click **Settings** (⚙️) to set your exam date and target score
2. Navigate to **Solve Questions** tab
3. Choose your paper/section and start solving
4. Track your progress on the Dashboard

## 📦 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)**: No frameworks, pure JS
- **LocalStorage**: Client-side data persistence
- **SVG**: Charts and visualizations

## 🔧 Customization

### Adding Your Own Questions
Edit the `questionBank` array in the JavaScript section:

```javascript
const questionBank = [
    {
        id: 'Q2024_001',
        paper: 'NIMCET 2024',
        section: 'Math',
        topic: 'Limits',
        difficulty: 'Easy',
        question: 'Your question here',
        options: ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'],
        correct: 0, // Index of correct answer (0-3)
        explanation: 'Step-by-step explanation'
    }
];
```

### Integrating Cerebras AI
To add real AI explanations, replace the `askAI()` function with API calls to Cerebras:

```javascript
async function askAI() {
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'cerebras-gpt',
            messages: [{ role: 'user', content: 'Explain this question...' }]
        })
    });
    // Handle response
}
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Advanced Features (Future)

- [ ] Backend integration (Node.js + MongoDB)
- [ ] Real-time AI explanations via Cerebras API
- [ ] PDF question parser
- [ ] Multi-user support with authentication
- [ ] Cloud sync (Google Drive, Dropbox)
- [ ] Email reports and reminders
- [ ] Mobile app (React Native)
- [ ] Collaborative features

## 📄 License

This project is open source and available for personal use. Feel free to customize and extend it for your preparation needs.

## 🤝 Contributing

This is a single-file application designed for simplicity. To contribute:
1. Fork the repository
2. Make your changes to `index.html`
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub.

## 🎯 Roadmap Timeline

**Phase 1** (Jan 11 - Feb 28): Foundation Building
- Solve 720+ questions
- Identify weak areas
- Build core concepts

**Phase 2** (Mar 1 - Apr 11): Targeted Drilling
- 50 questions/day on weak topics
- Weekly mistake reviews
- 4 full mock tests

**Phase 3** (Apr 12 - May 2): Speed Building
- Timed practice daily
- 3 mock tests/week
- Reduce average time to 45 seconds

**Phase 4** (May 3 - Jun 13): Final Sprint
- Daily full mock tests
- Review all mistakes
- Formula revision

## 🏆 Tips for Success

1. **Consistency**: Solve 30-50 questions daily
2. **Review Mistakes**: Spend 30 minutes daily on mistake notebook
3. **Mock Tests**: Take at least 1 full mock per week
4. **Track Progress**: Check analytics weekly to identify trends
5. **Spaced Repetition**: Review mistakes after 1, 3, 7, 14 days

---

**Good luck with your NIMCET preparation! 🎓**
