import React from 'react';

const TechIcon = ({ tech, size = 24 }) => {
  const techIcons = {
    'React': '⚛️',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'Node.js': '🟢',
    'Redux': '🟣',
    'HTML5': '🟧',
    'CSS3': '🔵',
    'MongoDB': '🍃',
    'Express': '⚡',
    'Chart.js': '📊',
    'Ant Design': '🐜',
    'Highcharts': '📈',
    'Handlebars': '🔧',
    'Formik': '📝',
    'Yup': '✅',
    'Firebase': '🔥',
    'Web Audio API': '🎵',
    'React Native': '📱'
  };

  return (
    <span 
      className="tech-icon" 
      style={{ fontSize: `${size}px` }}
      title={tech}
    >
      {techIcons[tech] || '💻'}
    </span>
  );
};

export default TechIcon;