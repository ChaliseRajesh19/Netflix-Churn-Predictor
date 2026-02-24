import { useState } from 'react';
import getPredictions from '../api/HandleApi';
import Result from './Result';

function Form() {
    const [formData, setFormData] = useState({
        age: '',
        watch_hours: 0.0,
        last_login_days: 0,
        monthly_fee: 0.0,
        gender: '',
        subscription_type: '',
        device: '',
        region: '',
        favorite_genre: '',
        profiles_count: 0,
    });

    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await getPredictions(formData);
            setPrediction(response);
            setError(null);
        } catch (error) {
            console.error("Error fetching predictions:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-shell">
            <div className="ambient-glow" aria-hidden="true">
                <span className="orb orb-1" />
                <span className="orb orb-2" />
                <span className="orb orb-3" />
            </div>

            <div className="app-card">
                <div className="text-center mb-8">
                    <div className="brand-pill">NETFLIX Churn Predictor</div>
                    <h2 className="section-title">Churn Signal Studio</h2>
                    <p className="section-subtitle">Spot early risk, prioritize retention, and move fast.</p>
                </div>

                <form onSubmit={handleSubmit} className="form-panel grid grid-cols-2 gap-6 mb-8">
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Age</label>
                        <input
                            className="input-base"
                            type="number"
                            placeholder="18+"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Watch Hours</label>
                        <input
                            className="input-base"
                            type="number"
                            placeholder="Enter watch hours"
                            value={formData.watch_hours}
                            onChange={(e) => setFormData({ ...formData, watch_hours: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Last Login Days</label>
                        <input
                            type="number"
                            placeholder="Days since last login"
                            className="input-base"
                            value={formData.last_login_days}
                            onChange={(e) => setFormData({ ...formData, last_login_days: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Monthly Fee</label>
                        <input
                            type="number"
                            placeholder="Monthly fee in USD"
                            className="input-base"
                            value={formData.monthly_fee}
                            onChange={(e) => setFormData({ ...formData, monthly_fee: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Gender</label>
                        <select
                            className="select-base"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Subscription Type</label>
                        <select
                            className="select-base"
                            value={formData.subscription_type}
                            onChange={(e) => setFormData({ ...formData, subscription_type: e.target.value })}
                        >
                            <option value="">Select subscription</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Family">Standard</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Device</label>
                        <select
                            className="select-base"
                            value={formData.device}
                            onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                        >
                            <option value="">Select device</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Laptop">Laptop</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Region</label>
                        <select
                            className="select-base"
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        >
                            <option value="">Select region</option>
                            <option value="North America">North America</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            <option value="South America">South America</option>
                            <option value="Africa">Africa</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Favorite Genre</label>
                        <select
                            className="select-base"
                            value={formData.favorite_genre}
                            onChange={(e) => setFormData({ ...formData, favorite_genre: e.target.value })}
                        >
                            <option value="">Select genre</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Documentary">Documentary</option>
                        </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="field-label">Profiles Count</label>
                        <input
                            type="number"
                            placeholder="Number of profiles"
                            className="input-base"
                            value={formData.profiles_count}
                            onChange={(e) => setFormData({ ...formData, profiles_count: e.target.value })}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="primary-button col-span-2">
                        {loading ? (
                            <>
                                <span className="inline-block animate-spin">⏳</span>
                                Scoring customer...
                            </>
                        ) : (
                            <>Run churn prediction</>
                        )}
                    </button>
                </form>

                {prediction && (
                    <div className="mt-8 animate-fadeIn">
                        <Result prediction={prediction} />
                    </div>
                )}

                {error && (
                    <div className="error-card mt-8 animate-shake">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">❌</span>
                            <div>
                                <h3 className="text-lg font-semibold">Prediction error</h3>
                                <p className="text-sm text-slate-100/80">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;