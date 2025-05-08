"use client";

import React from 'react';

export default function StatsSection() {
  return (
    <section className="stats-section py-4 bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm">
              <div className="icon mb-3">
                <i className="fa fa-users fa-2x text-primary"></i>
              </div>
              <h3 className="counter fw-bold">3,500+</h3>
              <p className="text-muted mb-0">Students</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm">
              <div className="icon mb-3">
                <i className="fa fa-graduation-cap fa-2x text-primary"></i>
              </div>
              <h3 className="counter fw-bold">25+</h3>
              <p className="text-muted mb-0">Programs</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm">
              <div className="icon mb-3">
                <i className="fa fa-flask fa-2x text-primary"></i>
              </div>
              <h3 className="counter fw-bold">150+</h3>
              <p className="text-muted mb-0">Research Publications</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="stats-item text-center bg-white p-4 h-100 rounded shadow-sm">
              <div className="icon mb-3">
                <i className="fa fa-hospital fa-2x text-primary"></i>
              </div>
              <h3 className="counter fw-bold">95%</h3>
              <p className="text-muted mb-0">Graduate Employment Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
