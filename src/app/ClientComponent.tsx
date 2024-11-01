// "use client";
// import { useAuth, useLoginWithRedirect } from "@frontegg/nextjs";//, useLoginWithRedirect
// import { AdminPortal } from '@frontegg/nextjs'
// import { useRouter } from 'next/navigation';
// import { useCallback } from "react";

// export const ClientComponent = () => {
//   const { user, isAuthenticated } = useAuth();
//   const loginWithRedirect = useLoginWithRedirect();
//   const router = useRouter();

//   const logout = useCallback(() => {
//     router.replace('/account/logout');
//   }, [router]);




//   return (
//     <div className="App">
//       {isAuthenticated ? (
//         <div>
//           {/* <div>
//             <img src={user?.profilePictureUrl} alt={user?.name} />
//           </div> */}
//           <div>
//             <span>Logged in as: {user?.name}</span>
//           </div>
//           <div>
//             <button onClick={() => alert(user?.accessToken)}>
//               What is my access token?
//             </button>
//           </div>
//           <div>
//             <button onClick={() => logout()}>Click to logout</button>
//           </div>
//           {/* <div>
//             <button onClick={handleClick}>Settings</button>
//           </div> */}
//         </div>
//       ) : (
//         <><></><div>
//           <button onClick={() => loginWithRedirect()}>Click me to login</button>
//         </div></>
//       )}
//     </div>
//   );
// };


// app/ClientComponent.tsx
"use client";
import { useAuth, useLoginWithRedirect } from "@frontegg/nextjs";
import { useRouter } from 'next/navigation';
import { useCallback } from "react";
import { useAuthSync } from "./hooks/useAuthSync";

export const ClientComponent = () => {
  const { user, isAuthenticated } = useAuth();
  const { backendSynced } = useAuthSync();
  const loginWithRedirect = useLoginWithRedirect();
  const router = useRouter();

  const logout = useCallback(async () => {
    // Optionally notify backend about logout
    if (user?.accessToken) {
      await fetch('http://localhost:3001/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
    }
    router.replace('/account/logout');
  }, [router, user]);

  return (
      <div className="App">
        {isAuthenticated ? (
          <div>
            {/* <div>
              <img src={user?.profilePictureUrl} alt={user?.name} />
            </div> */}
            <div>
              <span>Logged in as: {user?.name}</span>
            </div>
            <div>
              <button onClick={() => alert(user?.accessToken)}>
                What is my access token?
              </button>
            </div>
            <div>
              <button onClick={() => logout()}>Click to logout</button>
            </div>
            {/* <div>
              <button onClick={handleClick}>Settings</button>
            </div> */}
          </div>
        ) : (
          <><></><div>
            <button onClick={() => loginWithRedirect()}>Click me to login</button>
          </div></>
        )}
      </div>
    );
};
