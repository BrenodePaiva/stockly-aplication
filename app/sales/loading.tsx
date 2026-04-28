import { Loader2 } from "lucide-react";

 const Loading = () => {
  return (
 <div className="m-8 ml-56 w-screen h-screen space-y-8 rounded-lg bg-gray-400 bg-opacity-50 p-8 flex items-center justify-center">
      <Loader2 className="h-20 w-20 animate-spin text-blue-500" />
    </div>
  );
}

export default Loading