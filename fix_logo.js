const fs = require('fs');

const loginPath = 'src/app/(auth)/login/page.tsx';
const signupPath = 'src/app/(auth)/signup/page.tsx';
const forgotPath = 'src/app/(auth)/forgot-password/page.tsx';

function fixTernary(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary\/10">[\s\S]*?\{inviteToken \? \([\s\S]*?<UsersRound className="h-6 w-6 text-primary" \/>[\s\S]*?\) : \([\s\S]*?<img src="\/logo\.jpg" alt="Logo" className="h-6 w-6 rounded object-contain" \/>[\s\S]*?\)\}[\s\S]*?<\/div>/m,
    `{inviteToken ? (
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <UsersRound className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <img src="/logo.jpg" alt="Logo" className="mb-2 h-12 w-12 rounded-xl object-contain bg-white" />
          )}`
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function fixSimple(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary\/10">\s*<img src="\/logo\.jpg" alt="Logo" className="h-6 w-6 rounded object-contain" \/>\s*<\/div>/m,
    `<img src="/logo.jpg" alt="Logo" className="mb-2 h-12 w-12 rounded-xl object-contain bg-white" />`
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

fixTernary(loginPath);
fixTernary(signupPath);
fixSimple(forgotPath);
console.log('Fixed wrappers');
