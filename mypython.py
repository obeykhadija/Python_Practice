# Python Practice

# Organizing Data
#Example: Highscore Comparison
user_scores = [12, 42, 55, 100, 11, 22]
highest = user_scores[0]

for score in user_scores:
  if score > highest:
    highest = score
 
print(f'Highest score: {highest}')

#Example: Updating Humidity Data
humidity_level = [87, 83, 89, 88, 87]
humidity_level.insert(0, 90)
humidity_level.pop()

print(humidity_level)
 
#REST APIs
#Example: Watson Speech to Text Translator
#Speech to Text
!pip install ibm_watson wget

from ibm_watson import SpeechToTextV1 
import json
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

url_s2t = ""
iam_apikey_s2t = ""

authenticator = IAMAuthenticator(iam_apikey_s2t)
s2t = SpeechToTextV1(authenticator=authenticator)
s2t.set_service_url(url_s2t)
s2t

wav_file_name = ""
with open(wav_file_name, mode="rb") as wav:
    response = s2t.recognize(audio=wav, content_type='audio/mp3')
response.result
from pandas import json_normalize

json_normalize(response.result['results'],"alternatives")
print(response)

recognized_text=response.result['results'][0]["alternatives"][0]["transcript"]
type(recognized_text)
#Language Translator
from ibm_watson import LanguageTranslatorV3

url_lt=''
apikey_lt=''
version_lt='2018-05-01'

authenticator = IAMAuthenticator(apikey_lt)
language_translator = LanguageTranslatorV3(version=version_lt,authenticator=authenticator)
language_translator.set_service_url(url_lt)
language_translator

from pandas import json_normalize

json_normalize(language_translator.list_identifiable_languages().get_result(), "languages")

translation_response = language_translator.translate(\
    text=recognized_text, model_id='en-es')

translation=translation_response.get_result()
translation

spanish_translation =translation['translations'][0]['translation']
spanish_translation 

translation_new = language_translator.translate(text=spanish_translation ,model_id='es-en').get_result()

translation_eng=translation_new['translations'][0]['translation']
translation_eng
translation_response
