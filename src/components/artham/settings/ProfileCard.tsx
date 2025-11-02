import { UserProfile } from "../../../types/artham";

interface ProfileCardProps {
  profile: UserProfile;
  setupComplete: boolean;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function ProfileCard({ profile, setupComplete, onUpdateProfile }: ProfileCardProps) {
  return (
    <div className="bg-white border-2 border-[#1C8B82]/20 rounded-xl shadow-sm bg-gradient-to-br from-white to-[#1C8B82]/5">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Photo */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-[#1C8B82] text-white flex items-center justify-center border-4 border-white shadow-lg">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            
            {/* ArthaScore Ring */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90 w-16 h-16">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#F4B400"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(profile.arthaScore / 100) * 175.93} 175.93`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-900">{profile.arthaScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
              placeholder="Your Name"
              className="px-4 py-2 border border-slate-300 rounded-lg max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent"
            />
            
            <div>
              <p className="text-slate-900">ArthaScore: {profile.arthaScore}</p>
              <p className="text-slate-600">
                {setupComplete
                  ? "✅ Setup complete! Your personalized score is ready."
                  : "Complete your setup to unlock your personalized ArthaScore"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
