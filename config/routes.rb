Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"

  namespace :api do
    resources :registrations, only: %i[create]
    resources :sessions, only: %i[create destroy]
    resources :health_check, only: %i[index]

    resources :classroom, only: %i[index] do
      get '/resources', action: 'resources'
      get '/quote', action: 'quote'
      get '/comments', action: 'comments'
    end
  end

  get "*any" => "home#index"
end
