type BadgeDisplayProps = {
  badges: string[];
};

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Deine Abzeichen</h3>

      {badges.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          Schließe dein erstes Bundle ab, um Abzeichen zu sammeln!
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 shadow-sm"
            >
              <span role="img" aria-label="Medaille">
                🏅
              </span>
              {badge}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
