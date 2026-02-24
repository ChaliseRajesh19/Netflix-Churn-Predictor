import React from 'react';

function Result({ prediction }) {
  const churn = prediction.churn;
  return (
    <div className="w-full">
      <div className="result-header">
        <div>
          <p className="result-kicker">Prediction output</p>
          <h3 className="result-title">Retention outlook</h3>
        </div>
        <span className={`status-pill ${churn ? 'status-pill--risk' : 'status-pill--safe'}`}>
          {churn ? 'High churn risk' : 'Healthy retention'}
        </span>
      </div>

      <div className={`result-card ${churn ? 'result-card--risk' : 'result-card--safe'}`}>
        <div className="flex items-center gap-5 mb-6">
          <span className="result-icon">{churn ? '⚠️' : '✅'}</span>
          <div>
            <p className="result-headline">{churn ? 'Act now on retention' : 'Customer looks stable'}</p>
            <p className="result-subtext">
              {churn
                ? 'Consider targeted offers, engagement nudges, or support outreach.'
                : 'Keep momentum with personalization and thoughtful engagement.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;