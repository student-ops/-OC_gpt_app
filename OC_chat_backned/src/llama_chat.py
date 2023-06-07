import pickle
import os
from datetime import datetime 
from dotenv import load_dotenv

from llama_index import download_loader, GPTVectorStoreIndex
download_loader("GithubRepositoryReader")

from llama_index.readers.llamahub_modules.github_repo import GithubClient, GithubRepositoryReader


def llamaChat(question):
# 環境変数を参照
  docs = None

  load_dotenv()
  if os.path.exists("docs.pkl"):
      current_datetime = datetime.now()
      with open('pkl_update_log.txt', 'a') as f:
          f.write(str(current_datetime) + '\n')
      with open("docs.pkl", "rb") as f:
          docs = pickle.load(f)

  if docs is None:
      github_client = GithubClient(os.getenv("GITHUB_TOKEN"))
      loader = GithubRepositoryReader(
          github_client,
          owner =                  "student-ops",
          repo =                   "raspi_go_TE",
          filter_directories =     (["python","go_serial"], GithubRepositoryReader.FilterType.INCLUDE),
          filter_file_extensions = ([".py",".go",".md"], GithubRepositoryReader.FilterType.INCLUDE),
          verbose =                True,
          concurrent_requests =    10,
      )

      docs = loader.load_data(branch="master")

      with open("docs.pkl", "wb") as f:
          pickle.dump(docs, f)

  index = GPTVectorStoreIndex.from_documents(docs)
  query_engine = index.as_query_engine()
  response = query_engine.query(question)
  # response = index.query("Explain each LlamaIndex class?")
  return response.response

# ans = llamaChat("describe atout the repo")
# print(ans)

# print(type(ans))
# print(ans.response)